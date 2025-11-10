import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';
import { PlayStrategy } from './Playstrategy';

class RandomStrategy extends PlayStrategy {
  private currentPlaylist!: Playlist;
  private remainingSong!: Song[];
  private history!: Song[];

  setPlaylist(playList: Playlist): void {
    this.currentPlaylist = playList;
    this.remainingSong = [...this.currentPlaylist.getSongList()];
    this.history = [];
  }

  hasNext(): boolean {
    if (this.currentPlaylist && this.remainingSong.length) {
      return true;
    }
    return false;
  }
  next(): Song {
    if (!this.hasNext()) {
      throw new Error('No song in remaining songs');
    }

    const randomIndex = Math.floor(Math.random() * this.remainingSong.length);

    const currentSong = this.remainingSong[randomIndex];
    this.remainingSong.splice(randomIndex, 1);
    this.history.push(currentSong);
    return currentSong;
  }

  hasPrevious(): boolean {
    if (this.history.length > 0) {
      return true;
    }
    return false;
  }

  previous(): Song {
    if (!this.hasPrevious()) {
      throw new Error('No Previos song present');
    }
    const currSong = this.history.pop();
    if (!currSong) {
      throw new Error('Curr song is empty');
    }
    return currSong;
  }

  addTonext(song: Song): void {
    this.currentPlaylist.addSongToPlaylist(song);
  }
}

export { RandomStrategy };
