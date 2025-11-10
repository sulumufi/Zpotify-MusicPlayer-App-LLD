import { DeviceType } from './enums/deviceType';
import { PlaylistStrategyType } from './enums/PlaylistStrategyType';
import { MusicPlayerApplication } from './MusicPlayerApplication';

const main = () => {
  const musicApp: MusicPlayerApplication = MusicPlayerApplication.getInstance();

  //populate Library
  musicApp.createSong('song1', 'artist1', '/path1');
  musicApp.createSong('song2', 'artist2', '/path2');
  musicApp.createSong('song3', 'artist3', '/path3');
  musicApp.createSong('song4', 'artist4', '/path4');
  musicApp.createSong('song5', 'artist5', '/path5');

  //create Playlists
  musicApp.createPlaylist('playlist1');
  musicApp.addSongToPlaylist('playlist1', 'song1');
  musicApp.addSongToPlaylist('playlist1', 'song2');
  musicApp.addSongToPlaylist('playlist1', 'song3');
  musicApp.addSongToPlaylist('playlist1', 'song4');

  // connect audio Device
  musicApp.connectAudioDevice(DeviceType.BLUETOOTH);

  //play or pause song
  musicApp.playSingleSong('song1');
  musicApp.pauseCurrentSong('song1');
  musicApp.playSingleSong('song1');

  // playlist strategy
  console.log('Sequential Playlist');
  musicApp.selectPlaylistStrategy(PlaylistStrategyType.SEQUENTIAL);
  musicApp.loadPlaylist('playlist1');
  musicApp.playAllsongs();

  console.log('Random Playlist');
  musicApp.selectPlaylistStrategy(PlaylistStrategyType.RANDOM);
  musicApp.loadPlaylist('playlist1');
  musicApp.playAllsongs();

  console.log('Custom Playlist');
  musicApp.selectPlaylistStrategy(PlaylistStrategyType.CUSTOM);
  musicApp.loadPlaylist('playlist1');
  musicApp.queueNextsong('song1');
  musicApp.queueNextsong('song2');
  musicApp.playAllsongs();

  // playPrevious in Sequential
  musicApp.selectPlaylistStrategy(PlaylistStrategyType.SEQUENTIAL);
  musicApp.loadPlaylist('playlist1');
  musicApp.playAllsongs();

  musicApp.playPreviousSongInPlaylist();
  musicApp.playPreviousSongInPlaylist();
};

main();
