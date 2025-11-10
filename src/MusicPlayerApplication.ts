import { DeviceType } from './enums/deviceType';
import { PlaylistManager } from './mangers/PlaylistManager';
import { Song } from './models/songs';
import { MusicPlayerFascade } from './MusicPlayerFascade';
import { PlaylistStrategyType } from './enums/PlaylistStrategyType';

class MusicPlayerApplication {
  private static instance: MusicPlayerApplication;
  private songsList: Song[] = [];

  static getInstance(): MusicPlayerApplication {
    if (MusicPlayerApplication.instance == null) {
      MusicPlayerApplication.instance = new MusicPlayerApplication();
    }
    return MusicPlayerApplication.instance;
  }

  createSong(title: string, artist: string, filePath: string) {
    const song = new Song(title, artist, filePath);
    this.songsList.push(song);
  }

  getSongByTitle(title: string): Song | null {
    for (const song of this.songsList) {
      if (song.getTitle() == title) {
        return song;
      }
    }
    return null;
  }

  createPlaylist(playlistName: string): void {
    PlaylistManager.getInstance().createPlaylist(playlistName);
  }

  addSongToPlaylist(playListName: string, songTitle: string) {
    const song: Song | null = this.getSongByTitle(songTitle);
    if (!song) {
      console.log(' song not present');
      throw new Error('song is not present');
    }

    PlaylistManager.getInstance().addSongToPlaylist(song, playListName);
  }

  connectAudioDevice(deviceType: DeviceType) {
    MusicPlayerFascade.getInstance().connectDevice(deviceType);
  }

  selectPlaylistStrategy(playlistStrategyType: PlaylistStrategyType) {
    MusicPlayerFascade.getInstance().setPlayerStrategy(playlistStrategyType);
  }

  loadPlaylist(playlistName: string) {
    MusicPlayerFascade.getInstance().loadPlaylist(playlistName);
    
  }

  playSingleSong(songTitle: string) {
    const song: Song | null = this.getSongByTitle(songTitle);
    if (!song) {
      throw new Error('Song not present in the list');
    }
    MusicPlayerFascade.getInstance().playSong(song);
  }

  pauseCurrentSong(songTitle: string) {
    const song: Song | null = this.getSongByTitle(songTitle);
    if (!song) {
      throw new Error('Song not present in the list');
    }
    MusicPlayerFascade.getInstance().pauseSong(song);
  }

  playAllsongs(): void {
    MusicPlayerFascade.getInstance().playAllSongs();
  }

  playNextSongInPlaylist(): void {
    MusicPlayerFascade.getInstance().playNextSong();
  }

  playPreviousSongInPlaylist(): void {
    MusicPlayerFascade.getInstance().playPreviousSong();
  }

  queueNextsong(songTitle: string): void {
    const song: Song | null = this.getSongByTitle(songTitle);
    if (!song) {
      throw new Error('Song not present in the list');
    }
    MusicPlayerFascade.getInstance().enqueuNext(song);
  }
}

export { MusicPlayerApplication };
