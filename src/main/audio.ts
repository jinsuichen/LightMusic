import Store from 'electron-store';

const store = new Store();

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
  status: 'ok' | 'down';
  author: string;
  pic: string;
  lyric: string;
};

const isSame = (audioInfo1: AudioInfo, audioInfo2: AudioInfo): boolean => {
  return (
    audioInfo1.caption === audioInfo2.caption &&
    audioInfo1.from === audioInfo2.from &&
    audioInfo1.source === audioInfo2.source &&
    audioInfo1.author === audioInfo2.author &&
    audioInfo1.pic === audioInfo2.pic &&
    audioInfo1.lyric === audioInfo2.lyric
  );
};

const getAudioList = (): Array<AudioInfo> => {
  if (!store.has('audioList')) {
    store.set('audioList', []);
  }
  console.log(store.get('audioList'))
  return store.get('audioList') as Array<AudioInfo>;
};

const addAudio = (audioInfo: AudioInfo): void => {
  const currentAudioList = getAudioList();

  const exist = currentAudioList.find((item) => {
    const same: boolean = isSame(audioInfo, item);
    if(same) {
      item.status = 'ok';
    }
    return same
  });
  if (exist) {
    store.set('audioList', currentAudioList);
  } else {
    store.set('audioList', [...currentAudioList, audioInfo]);
  }
};

const deleteAudio = (audioInfo: AudioInfo): void => {
  const currentAudioList = getAudioList();
  const newAudioList = currentAudioList.filter((item) => {
    return isSame(audioInfo, item);
  });
  store.set('audioList', newAudioList);
};

const changeStatusToDown = (audioInfo: AudioInfo): void => {
  const audioInfoList =  getAudioList();
  const newAudioInfoList = audioInfoList.map((item) => {
    if(isSame(audioInfo, item)) {
      return {...item, status:'down'};
    }
    return item;
  })
  store.set('audioList', newAudioInfoList);
}

export { getAudioList, addAudio, deleteAudio, changeStatusToDown };
