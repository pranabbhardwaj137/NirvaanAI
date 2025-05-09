import axios from 'axios';

const DIA_API_URL = 'https://api-inference.huggingface.co/models/nari-labs/Dia-1.6B';

export class TTSService {
  private static instance: TTSService;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY || '';
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
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBufferSource = await audioContext.decodeAudioData(audioBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBufferSource;
    source.connect(audioContext.destination);
    source.start(0);
  }
} 