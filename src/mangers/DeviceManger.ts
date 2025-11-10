import { IAudioOutputDevice } from '../device/IAudioOutputDevice';
import { DeviceType } from '../enums/deviceType';
import { DeviceFactory } from '../factories/DeviceFactory';

class DeviceManager {
  static instace: DeviceManager;
  private currentOutputDevice!: IAudioOutputDevice;

  static getInstance(): DeviceManager {
    if (DeviceManager.instace == null) {
      DeviceManager.instace = new DeviceManager();
    }
    return DeviceManager.instace;
  }

  connect(deviceType: DeviceType): void {
    const deviceFactory = new DeviceFactory();
    this.currentOutputDevice = deviceFactory.createDevice(deviceType);
    console.log('Connected to: ', deviceType, 'Device');
  }

  getOutputDevice(): IAudioOutputDevice {
    if (this.currentOutputDevice == null) {
      console.log('no output device connected');
    }

    return this.currentOutputDevice;
  }

  hasOutputDevice(): boolean {
    return this.currentOutputDevice != null;
  }
}

export { DeviceManager };
