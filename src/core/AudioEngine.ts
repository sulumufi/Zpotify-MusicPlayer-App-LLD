import { IAudioOutputDevice } from '../device/IAudioOutputDevice';
import { Song } from '../models/songs';

class AudioEngine {
  private current_song!: Song;
  private isSongPaused: boolean = false;

  getCurrentSongTitle(): string {
    if (this.current_song) {
      return this.current_song.getTitle();
    }
    return '';
  }

  isPaused(): boolean {
    return this.isSongPaused;
  }

  play(audioOutputDevice: IAudioOutputDevice, song: Song): void {
    if (!song) {
      console.log('Song is not assigned');
      throw new Error('Song is not assigned');
    }

    if (this.isSongPaused && song == this.current_song) {
      this.isSongPaused = false;
      console.log('resuming current song', song.getTitle());
      audioOutputDevice.playAudio(song);
      return;
    }

    this.current_song = song;
    this.isSongPaused = false;
    console.log('playing song..', song.getTitle());
    audioOutputDevice.playAudio(song);
  }

  pause(): void {
    if (this.current_song == null) {
      console.log('No song is playing');
    }

    if (this.isSongPaused) {
      console.log('Song is already paused');
    }

    this.isSongPaused = true;
    console.log('Pausing Song: ', this.current_song.getTitle());
  }
}

export { AudioEngine };
