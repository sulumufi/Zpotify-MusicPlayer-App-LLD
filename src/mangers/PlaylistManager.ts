import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';

class PlaylistManager {
  static instance: PlaylistManager;
  private playlists: Map<string, Playlist> = new Map();
  static getInstance(): PlaylistManager {
    if (PlaylistManager.instance == null) {
      PlaylistManager.instance = new PlaylistManager();
    }
    return PlaylistManager.instance;
  }

  createPlaylist(playlistName: string) {
    const playlist = new Playlist(playlistName);
    this.playlists.set(playlistName, playlist);
  }

  addSongToPlaylist(song: Song, playlistName: string) {
    if (!this.playlists.get(playlistName)) {
      console.log('Playlist with name :', playlistName, ' not present');
    }

    const playlist: Playlist | undefined = this.playlists.get(playlistName);
    const songList: Song[] | undefined = playlist?.getSongList();
    const isSongPresent = songList?.map((x) => {
      return x.getTitle() == song.getTitle();
    });
    if (isSongPresent?.includes(true)) {
      console.log('Song Already present in Playlist');
      return;
    }
    playlist?.addSongToPlaylist(song);
  }

  getPlaylist(playlistName: string) {
    if (!this.playlists.get(playlistName)) {
      console.log('playlist with name: ', playlistName, ' Not present');
      throw new Error('playlist with name not found');
    }

    const playlist = this.playlists.get(playlistName);
    if (!playlist) {
      throw new Error('play list in undefined');
    }
    return playlist;
  }
}

export { PlaylistManager };
