import { BluetoothSpeakerApi } from '../external/BluetoothSpeakerApi';
import { Song } from '../models/songs';
import { IAudioOutputDevice } from './IAudioOutputDevice';

class BluetoothSpeakerAdapter implements IAudioOutputDevice {
  constructor(private bluetoothApi: BluetoothSpeakerApi) {}
  playAudio(song: Song): void {
    const payload = song.getTitle() + ' by ' + song.getArtist();
    this.bluetoothApi.playViaBluetooth(payload);
  }
}

export { BluetoothSpeakerAdapter };
