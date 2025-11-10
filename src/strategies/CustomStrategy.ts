import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';
import { PlayStrategy } from './Playstrategy';

class CustomStrategy extends PlayStrategy {
  private currentPlaylist!: Playlist;
  private currentIndex!: number;
  private queue!: Song[];
  private stack!: Song[];

  setPlaylist(playList: Playlist): void {
    this.currentPlaylist = playList;
    this.currentIndex = -1;
    this.queue = [];
    this.stack = [];
  }

  nextSequential(): Song {
    if (this.currentPlaylist.getSize() == 0) {
      throw new Error('There are no songs in the playlist');
    }
    this.currentIndex = this.currentIndex + 1;
    return this.currentPlaylist.getSongList()[this.currentIndex];
  }

  previousSequential(): Song {
    if (this.currentPlaylist.getSize() == 0) {
      throw new Error('There are no songs in the playlist');
    }
    this.currentIndex = this.currentIndex - 1;
    return this.currentPlaylist.getSongList()[this.currentIndex];
  }

  next(): Song {
    if (!this.currentPlaylist || this.currentPlaylist.getSize() == 0) {
      throw new Error('No songs present in Playlist');
    }
    if (this.queue.length != 0) {
      const currSong = this.queue.shift();
      if (!currSong) {
        throw new Error('No currSong');
      }
      this.stack.push(currSong);

      return currSong;
    }
    return this.nextSequential();
  }

  previous(): Song {
    if (!this.stack.length) {
      throw new Error('No previos song');
    }

    const song = this.stack.pop();
    if (!song) {
      throw new Error('Song is empty');
    }
    return song;
  }

  addTonext(song: Song): void {
    if (!song) {
      throw new Error('song is not valid');
    }
    this.queue.push(song);
  }

  hasNext(): boolean {
    if (!this.queue.length) {
      return false;
    }
    return true;
  }

  hasPrevious(): boolean {
    if (!this.stack.length) {
      return false;
    }
    return true;
  }
}

export { CustomStrategy };
