import { Song } from './songs';

class Playlist {
  private songList: Song[] = [];
  constructor(private playlistName: string) {}

  getPlaylistName(): string {
    return this.playlistName;
  }

  getSongList(): Song[] {
    return this.songList;
  }

  getSize(): number {
    return this.songList.length;
  }

  addSongToPlaylist(song: Song): void {
    if (song == null) {
      throw new Error('Son is null');
    }
    this.songList.push(song);
  }
}

export { Playlist };
