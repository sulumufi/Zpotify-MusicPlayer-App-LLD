class WiredSpeakerApi {
  public playViaWiredSpeaker(data: string): void {
    console.log(this.constructor.name + ' Playing song now: ', data);
  }
}

export { WiredSpeakerApi };
