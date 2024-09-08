type LoadAudiosMessage = { success: boolean; error?: ErrorEvent };

type LoadAudioMessage = { success: boolean; error?: ErrorEvent };
type LoadAudioType = (audio: HTMLAudioElement) => Promise<LoadAudioMessage>;

type LoadAudiosType = (
  audios: HTMLAudioElement[]
) => Promise<LoadAudiosMessage>;

const loadAudio: LoadAudioType = (audio) => {
  audio.load();

  return new Promise((resolve, reject) => {
    audio.addEventListener("load", () => {
      resolve({ success: true });
    });

    audio.addEventListener("error", (error) => {
      resolve({ success: false, error });
    });
  });
};

export const loadAudios: LoadAudiosType = (audios) => {
  return new Promise((resolve, reject) => {
    const promises: Promise<LoadAudioMessage>[] = [];

    audios.forEach(async (audio) => {
      promises.push(loadAudio(audio));
    });

    try {
      Promise.all(promises);

      resolve({ success: true });
    } catch (error) {
      reject({ success: false, error });
    }
  });
};
