// TODO: Consider consolidating these voice-related utilities
// Note: Some of these functions might be redundant but keeping them for now
// as they might be useful in different contexts

// Format text for speech synthesis
export const formatTextForSpeech = (text: string): string => {
  return text.replace(/([.,!?])/g, '$1 ');
};

// Alternative implementation of the same function
// Keeping both for now as they might be used in different contexts
export const addPausesToText = (text: string): string => {
  const punctuation = ['.', ',', '!', '?'];
  let result = text;
  punctuation.forEach(p => {
    result = result.replace(new RegExp(`\\${p}`, 'g'), `${p} `);
  });
  return result;
};

// Get preferred voice from available voices
export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  const preferredVoices = [
    'Google US English Female',
    'Google UK English Female',
    'Microsoft Aria Online (Natural)',
    'Microsoft Jenny Online (Natural)',
    'Microsoft Guy Online (Natural)',
    'Samantha',
    'Daniel',
    'Moira'
  ];
  
  return voices.find(voice => preferredVoices.includes(voice.name)) ||
         voices.find(voice => voice.lang.includes('en') && voice.name.includes('Female')) ||
         voices.find(voice => voice.lang.includes('en')) ||
         voices[0] ||
         null;
};

// Alternative implementation using a different approach
export const findBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices.length) return null;
  
  // First try to find a female English voice
  const femaleEnglish = voices.find(v => 
    v.lang.includes('en') && 
    (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'))
  );
  if (femaleEnglish) return femaleEnglish;
  
  // Then try to find any English voice
  const english = voices.find(v => v.lang.includes('en'));
  if (english) return english;
  
  // Finally, just return the first voice
  return voices[0];
};

// Utility to check if speech synthesis is available
export const isSpeechSynthesisAvailable = (): boolean => {
  return 'speechSynthesis' in window;
};

// Utility to check if speech recognition is available
export const isSpeechRecognitionAvailable = (): boolean => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// TODO: Consider adding more voice-related utilities here
// For example:
// - Voice pitch adjustment
// - Speech rate control
// - Voice volume control
// - Voice quality settings 