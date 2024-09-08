type ListeningResult = { transcript: string; confidence: number };
type ListeningCallbackFn = (result: ListeningResult) => void;
type ListeningLang = "ar-EG" | "en-US";

class VoiceAssistant {
  recognition: SpeechRecognition | null;
  voice: SpeechSynthesisVoice | null;
  lang: string;
  isListening: boolean;
  prevTranscript: string;
  currentListener: ((e: SpeechRecognitionEvent) => void) | null;

  constructor() {
    this.recognition = null;
    this.voice = null;
    this.lang = "ar";
    this.isListening = false;
    this.prevTranscript = "";
    this.currentListener = null;

    this.init();
  }

  async init() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.addEventListener("start", () => {
      this.isListening = true;
    });

    recognition.addEventListener("end", () => {
      if (!this.isListening) return;

      if (this.recognition) this.recognition.start();
    });

    const voices = await setSpeech();

    this.voice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes("ar-sa") ||
        v.lang.toLowerCase().includes(this.lang)
    ) as SpeechSynthesisVoice;

    this.recognition = recognition;
  }

  listen(lang: ListeningLang, cb: ListeningCallbackFn) {
    if (!this.recognition) throw Error(`Error: undefined speech recognition`);
    this.recognition.lang = lang;

    try {
      if (!this.isListening) this.recognition.start();

      // Check if a listener is already set and remove it if so
      if (this.currentListener) {
        this.recognition.removeEventListener("result", this.currentListener);
        this.currentListener = null; // Clear the current listener reference
      }

      this.currentListener = function resultHandler(e: SpeechRecognitionEvent) {
        const lastResult = e.results.length - 1;
        const result = e.results[lastResult][0];

        if (result.transcript === this.prevTranscript) return;

        if (result.transcript === "") {
          this.recognition?.stop();
          this.recognition?.start();
        }

        this.prevTranscript = result.transcript;
        cb(result);
      };

      this.recognition.addEventListener("result", this.currentListener);
    } catch (err) {}
  }

  speak(str: string) {
    return new Promise(async (resolve, reject) => {
      const voices = await setSpeech();

      this.voice = voices.find((v) =>
        v.lang.toLowerCase().includes(this.lang)
      ) as SpeechSynthesisVoice;

      const utterance = new SpeechSynthesisUtterance(str);

      utterance.voice = this.voice;

      utterance.rate = 1;

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);

      utterance.addEventListener("end", handleSpeakingEnd);

      function handleSpeakingEnd() {
        utterance.removeEventListener("end", handleSpeakingEnd);
        resolve(null);
      }

      speechSynthesis.addEventListener("error", handleError);

      function handleError() {
        speechSynthesis.removeEventListener("error", handleError);
        reject();
      }
    });
  }

  stopTalking() {
    if (speechSynthesis.speaking) speechSynthesis.pause();
  }

  stopListening() {
    if (!this.recognition) return;
    this.prevTranscript = "";
    this.recognition.stop();
    this.isListening = false;
  }
}

function setSpeech(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(function (resolve, reject) {
    let synth = window.speechSynthesis;
    let id: NodeJS.Timeout;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

export default VoiceAssistant;

export type { ListeningResult };
