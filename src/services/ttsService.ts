import axios from 'axios';

const DIA_API_URL = 'https://api-inference.huggingface.co/models/nari-labs/Dia-1.6B';

export class TTSService {
  private static instance: TTSService;
  private apiKey: string;
  private currentAudioSource: AudioBufferSourceNode | null = null;
  private audioContext: AudioContext | null = null;

  private constructor() {
    this.apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY || '';
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  public static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  public async textToSpeech(text: string): Promise<ArrayBuffer> {
    try {
      const response = await axios.post(
        DIA_API_URL,
        { inputs: text },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer'
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error in text-to-speech conversion:', error);
      throw error;
    }
  }

  public async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    try {
      // Stop any currently playing audio
      this.stopAudio();

      const audioBufferSource = await this.audioContext.decodeAudioData(audioBuffer);
      this.currentAudioSource = this.audioContext.createBufferSource();
      this.currentAudioSource.buffer = audioBufferSource;
      this.currentAudioSource.connect(this.audioContext.destination);
      
      // Add event listener for when audio ends
      this.currentAudioSource.onended = () => {
        this.currentAudioSource = null;
      };

      this.currentAudioSource.start(0);
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }

  public stopAudio(): void {
    if (this.currentAudioSource) {
      try {
        this.currentAudioSource.stop();
        this.currentAudioSource.disconnect();
        this.currentAudioSource = null;
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }
  }

  public isPlaying(): boolean {
    return this.currentAudioSource !== null;
  }
} 