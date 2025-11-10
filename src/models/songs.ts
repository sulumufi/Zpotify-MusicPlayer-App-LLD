class Song {
  constructor(
    private title: string,
    private artist: string,
    private path: string
  ) {}

  getTitle(): string {
    return this.title;
  }

  getArtist(): string {
    return this.artist;
  }

  getFilePath(): string {
    return this.path;
  }
}

export { Song };
