import Store from 'electron-store';

const store = new Store();

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
};

const getAudioList = (): Array<AudioInfo> => {
  if (!store.has('audioList')) {
    store.set('audioList', []);
  }
  return store.get('audioList') as Array<AudioInfo>;
};

const addAudio = (audioInfo: AudioInfo): void => {
  const currentAudioList = getAudioList();
  const exist = currentAudioList.find((item) => {
    return (
      item.caption === audioInfo.caption &&
      item.from === audioInfo.from &&
      item.source === audioInfo.source
    );
  });
  if (exist) return;
  const newAudioList = [...currentAudioList, audioInfo];
  store.set('audioList', newAudioList);
};

const deleteAudio = (audioInfo: AudioInfo): void => {
  const currentAudioList = getAudioList();
  const newAudioList = currentAudioList.filter((item) => {
    return (
      item.caption !== audioInfo.caption ||
      item.from !== audioInfo.from ||
      item.source !== audioInfo.source
    );
  });
  store.set('audioList', newAudioList);
};

export { getAudioList, addAudio, deleteAudio };
