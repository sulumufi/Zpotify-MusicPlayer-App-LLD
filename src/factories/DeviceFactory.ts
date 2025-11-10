import { BluetoothSpeakerAdapter } from '../device/BluetoothSpeakerAdapter';
import { HeadphonesAdapter } from '../device/HeadphonesAdapter';
import { IAudioOutputDevice } from '../device/IAudioOutputDevice';
import { WiredSpeakerAdapter } from '../device/WiredSpeakerAdapter';
import { DeviceType } from '../enums/deviceType';
import { BluetoothSpeakerApi } from '../external/BluetoothSpeakerApi';
import { HeadphonesApi } from '../external/HeadphonesApi';
import { WiredSpeakerApi } from '../external/WiredSpeakerApi';

class DeviceFactory {
  createDevice(deviceType: DeviceType): IAudioOutputDevice {
    if (deviceType == DeviceType.BLUETOOTH) {
      return new BluetoothSpeakerAdapter(new BluetoothSpeakerApi());
    } else if (deviceType == DeviceType.WIRED) {
      return new WiredSpeakerAdapter(new WiredSpeakerApi());
    } else if (deviceType == DeviceType.HEADPHONES) {
      return new HeadphonesAdapter(new HeadphonesApi());
    } else {
      return new WiredSpeakerAdapter(new WiredSpeakerApi());
    }
  }
}

export { DeviceFactory };
