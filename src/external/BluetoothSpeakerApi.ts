class BluetoothSpeakerApi {
  public playViaBluetooth(data: string): void {
    console.log(this.constructor.name + ' Playing song now: ', data);
  }
}

export { BluetoothSpeakerApi };
