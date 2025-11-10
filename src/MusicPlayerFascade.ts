import { AudioEngine } from './core/AudioEngine';
import { Playlist } from './models/playlist';
import { PlayStrategy } from './strategies/Playstrategy';
import { DeviceManager } from './mangers/deviceManger';
import { DeviceType } from './enums/deviceType';
import { PlaylistStrategyType } from './enums/PlaylistStrategyType';
import { PlaylistManager } from './mangers/PlaylistManager';
import { StrategyManager } from './mangers/StrategyManager';
import { Song } from './models/songs';
import { IAudioOutputDevice } from './device/IAudioOutputDevice';

class MusicPlayerFascade {
  static instance: MusicPlayerFascade;
  private audioEngine!: AudioEngine;
  private loadedPlaylist!: Playlist;
  private playlistStrategy!: PlayStrategy;

  constructor() {
    this.audioEngine = new AudioEngine();
  }

  static getInstance() {
    if (MusicPlayerFascade.instance == null) {
      MusicPlayerFascade.instance = new MusicPlayerFascade();
    }
    return MusicPlayerFascade.instance;
  }

  connectDevice(deiceType: DeviceType) {
    DeviceManager.getInstance().connect(deiceType);
  }

  setPlayerStrategy(strategyType: PlaylistStrategyType) {
    this.playlistStrategy =
      StrategyManager.getInstance().playStrategy(strategyType);
  }

  loadPlaylist(playlistName: string) {
    this.loadedPlaylist =
      PlaylistManager.getInstance().getPlaylist(playlistName);
    console.log('setting playlist ..', this.loadedPlaylist);
    this.playlistStrategy.setPlaylist(this.loadedPlaylist);
  }

  playSong(song: Song) {
    if (!DeviceManager.getInstance().hasOutputDevice()) {
      throw new Error('No Device assigned yet');
    }
    const outputDevice = DeviceManager.getInstance().getOutputDevice();
    this.audioEngine.play(outputDevice, song);
  }

  pauseSong(song: Song) {
    if (this.audioEngine.getCurrentSongTitle() != song.getTitle()) {
      throw new Error('cannot pause the this song, because its not playing');
    }
    this.audioEngine.pause();
  }

  playAllSongs(): void {
    if (!this.loadedPlaylist) {
      throw new Error('No playlist Loaded');
    }

    while (this.playlistStrategy.hasNext()) {
      const song: Song = this.playlistStrategy.next();
      const outputDevice: IAudioOutputDevice =
        DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(outputDevice, song);
    }

    console.log('completed Playlist');
  }

  playNextSong(): void {
    if (!this.loadedPlaylist) {
      throw new Error('No playlist Loaded');
    }

    if (this.playlistStrategy.hasNext()) {
      const song: Song = this.playlistStrategy.next();
      const outputDevice: IAudioOutputDevice =
        DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(outputDevice, song);
    } else {
      console.log('play list got over');
    }
  }

  playPreviousSong(): void {
    if (!this.loadedPlaylist) {
      throw new Error('No playlist Loaded');
    }

    if (this.playlistStrategy.hasPrevious()) {
      const song: Song = this.playlistStrategy.previous();
      const outputDevice: IAudioOutputDevice =
        DeviceManager.getInstance().getOutputDevice();
      this.audioEngine.play(outputDevice, song);
    } else {
      console.log('play list got over');
    }
  }

  enqueuNext(song: Song): void {
    this.playlistStrategy.addTonext(song);
  }
}

export { MusicPlayerFascade };
