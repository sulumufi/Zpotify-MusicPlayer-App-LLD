import { WiredSpeakerApi } from '../external/WiredSpeakerApi';
import { Song } from '../models/songs';
import { IAudioOutputDevice } from './IAudioOutputDevice';

class WiredSpeakerAdapter implements IAudioOutputDevice {
  constructor(private wiredSpeakerApi: WiredSpeakerApi) {}
  playAudio(song: Song): void {
    const payload = song.getTitle() + ' by ' + song.getArtist();
    this.wiredSpeakerApi.playViaWiredSpeaker(payload);
  }
}

export { WiredSpeakerAdapter };
