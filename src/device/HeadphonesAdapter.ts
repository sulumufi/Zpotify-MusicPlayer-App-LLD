import { HeadphonesApi } from '../external/HeadphonesApi';
import { Song } from '../models/songs';
import { IAudioOutputDevice } from './IAudioOutputDevice';

class HeadphonesAdapter implements IAudioOutputDevice {
  constructor(private headphonesApi: HeadphonesApi) {}
  playAudio(song: Song): void {
    const payload = song.getTitle() + ' by ' + song.getArtist();
    this.headphonesApi.playViaHeadphones(payload);
  }
}

export { HeadphonesAdapter };
