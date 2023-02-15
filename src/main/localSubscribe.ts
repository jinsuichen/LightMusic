import { addAudio } from './audio';
import { join } from 'path';

const fs = require('fs');

const audioSuffixes: Array<string> = ['mp3', 'wav', 'ogg'];

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
  status: 'ok' | 'down';
  author: string;
  pic: string;
  lyric: string;
};

// add audios in localSubscribe dir to audioList
const subscribeFromLocal = (dir: string): void => {
  const audioList: Array<AudioInfo> = getAudioFromLocalDir(dir);
  audioList.forEach((item) => {
    addAudio(item);
  });
};

// return array of audios in localSubscribe dir
const getAudioFromLocalDir = (dir: string): Array<AudioInfo> => {
  const result: Array<AudioInfo> = [];
  scanPath(dir, result);
  return result;
};

const scanPath = (dirPath: string, result: Array<AudioInfo>): void => {
  const files = fs.readdirSync(dirPath);

  try {
    files.forEach((fileName) => {
      const filePath = join(dirPath, fileName);

      const state = fs.statSync(filePath);

      if (state.isFile() && !state.isSymbolicLink()) {
        const isAudioFile: boolean = audioSuffixes.some((suffix) => {
          return fileName.endsWith(suffix);
        });
        if (isAudioFile) {
          result.push({
            source: 'file://' + filePath,
            caption: fileName.substring(0, fileName.length - 4),
            from: 'local',
            status: 'ok',
            pic: '',
            lyric: '',
            author: '',
          });
        }
      }

      if (state.isDirectory()) {
        scanPath(filePath, result);
      }
    });
  } catch (e) {
    // do nothing
    // if (e.code !== 'ENOENT') {
    //   console.log(e)
    // }
  }
};

export { subscribeFromLocal };
