import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';
import { PlayStrategy } from './Playstrategy';

class SequentialStrategy extends PlayStrategy {
  private currPlaylist!: Playlist;
  private currentIndex!: number;

  setPlaylist(playList: Playlist): void {
    this.currPlaylist = playList;
    this.currentIndex = 0;
  }

  hasNext(): boolean {
    if (!(this.currentIndex + 1 < this.currPlaylist.getSize())) {
      return false;
    }
    return true;
  }

  next(): Song {
    if (!(this.currentIndex < this.currPlaylist.getSize())) {
      throw new Error('No sing found;');
    }
    this.currentIndex = this.currentIndex + 1;
    return this.currPlaylist.getSongList()[this.currentIndex];
  }

  hasPrevious(): boolean {
    return this.currentIndex - 1 >= 0;
  }

  previous(): Song {
    if (!this.hasPrevious()) {
      throw new Error('No Previous song present');
    }
    this.currentIndex = this.currentIndex - 1;
    return this.currPlaylist.getSongList()[this.currentIndex];
  }

  addTonext(song: Song): void {
    this.currPlaylist.addSongToPlaylist(song);
  }
}

export { SequentialStrategy };
