class HeadphonesApi {
  public playViaHeadphones(data: string): void {
    console.log(this.constructor.name + ' Playing song now: ', data);
  }
}

export { HeadphonesApi };
