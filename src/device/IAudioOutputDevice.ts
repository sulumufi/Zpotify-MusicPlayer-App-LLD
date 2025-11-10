import { Song } from '../models/songs';

interface IAudioOutputDevice {
  playAudio(song: Song): void;
}

export { IAudioOutputDevice };
