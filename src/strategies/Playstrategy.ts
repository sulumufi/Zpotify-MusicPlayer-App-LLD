import { Playlist } from '../models/playlist';
import { Song } from '../models/songs';

abstract class PlayStrategy {
  abstract setPlaylist(playList: Playlist): void;
  abstract next(): Song;
  abstract previous(): Song;
  abstract hasNext(): boolean;
  abstract hasPrevious(): boolean;
  abstract addTonext(song: Song): void;
}

export { PlayStrategy };
