# Music Player Application

A well-architected TypeScript music player application demonstrating enterprise-level design patterns and clean code architecture. This project showcases the implementation of multiple design patterns including Facade, Strategy, Adapter, Factory, and Singleton patterns.

## Overview

This music player application provides a flexible, extensible architecture for managing playlists, songs, and audio output devices. While the external APIs are mocked for demonstration purposes, the architecture demonstrates production-ready patterns suitable for real-world applications.

## Features

- **Playlist Management**: Create, manage, and organize songs into playlists
- **Multiple Playback Strategies**:
  - Sequential: Play songs in order
  - Random: Shuffle through remaining songs with history tracking
  - Custom: Queue-based manual song selection
- **Device Abstraction**: Support for multiple audio output devices
  - Bluetooth Speakers
  - Wired Speakers
  - Headphones
- **Clean Architecture**: Clear separation of concerns with distinct layers
- **Type-Safe**: Written entirely in TypeScript

## Architecture

The application follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────┐
│   MusicPlayerApplication (API)      │ ← High-level interface
├─────────────────────────────────────┤
│   MusicPlayerFascade (Orchestrator) │ ← Coordination layer
├─────────────────────────────────────┤
│  Managers (Business Logic)          │
│  - DeviceManager                    │
│  - PlaylistManager                  │
│  - StrategyManager                  │
├─────────────────────────────────────┤
│  Core & Strategies                  │
│  - AudioEngine                      │
│  - PlayStrategy implementations     │
├─────────────────────────────────────┤
│  Models & Factories                 │
│  - Song, Playlist                   │
│  - DeviceFactory                    │
├─────────────────────────────────────┤
│  Device Adapters                    │
│  - IAudioOutputDevice interface     │
│  - Adapter implementations          │
└─────────────────────────────────────┘
```

## Design Patterns

### 1. Facade Pattern
`MusicPlayerFascade` and `MusicPlayerApplication` provide simplified interfaces to complex subsystems, hiding the complexity of manager coordination.

### 2. Strategy Pattern
Playlist playback strategies are interchangeable algorithms:
- `SequentialStrategy`: Index-based sequential playback
- `RandomStrategy`: Shuffled playback with history
- `CustomStrategy`: Queue-based manual control

### 3. Adapter Pattern
Device adapters convert external device APIs to a common `IAudioOutputDevice` interface:
```
BluetoothSpeakerApi → BluetoothSpeakerAdapter → IAudioOutputDevice
HeadphonesApi       → HeadphonesAdapter       → IAudioOutputDevice
WiredSpeakerApi     → WiredSpeakerAdapter     → IAudioOutputDevice
```

### 4. Factory Pattern
`DeviceFactory` creates appropriate device adapters based on `DeviceType` enum.

### 5. Singleton Pattern
All manager classes (`DeviceManager`, `PlaylistManager`, `StrategyManager`) and `MusicPlayerApplication` use the singleton pattern for single instance management.

## Project Structure

```
src/
├── core/
│   └── AudioEngine.ts              # Audio playback engine
├── models/
│   ├── songs.ts                    # Song domain object
│   └── playlist.ts                 # Playlist domain object
├── strategies/
│   ├── Playstrategy.ts             # Abstract strategy interface
│   ├── SequentialStrategy.ts       # Sequential playback
│   ├── RandomStrategy.ts           # Random playback
│   └── CustomStrategy.ts           # Queue-based playback
├── mangers/
│   ├── DeviceManger.ts             # Device connection management
│   ├── PlaylistManager.ts          # Playlist CRUD operations
│   └── StrategyManager.ts          # Strategy selection
├── factories/
│   └── DeviceFactory.ts            # Creates device adapters
├── device/
│   ├── IAudioOutputDevice.ts       # Device interface
│   ├── BluetoothSpeakerAdapter.ts  # Bluetooth adapter
│   ├── HeadphonesAdapter.ts        # Headphones adapter
│   └── WiredSpeakerAdapter.ts      # Wired speaker adapter
├── external/
│   ├── BluetoothSpeakerApi.ts      # External Bluetooth API (mocked)
│   ├── HeadphonesApi.ts            # External Headphones API (mocked)
│   └── WiredSpeakerApi.ts          # External Wired Speaker API (mocked)
├── enums/
│   ├── DeviceType.ts               # Device type enumeration
│   └── PlaylistStrategyType.ts     # Strategy type enumeration
├── MusicPlayerFascade.ts           # Mid-level orchestrator
├── MusicPlayerApplication.ts       # High-level application API
└── main.ts                         # Entry point & usage example
```

## Usage

### Basic Example

```typescript
import { MusicPlayerApplication } from './MusicPlayerApplication';
import { DeviceType } from './enums/DeviceType';
import { PlaylistStrategyType } from './enums/PlaylistStrategyType';

// Get application instance (Singleton)
const musicApp = MusicPlayerApplication.getInstance();

// Create songs
musicApp.createSong("Song Title", "Artist Name", "/path/to/song.mp3");

// Create playlist
musicApp.createPlaylist("My Playlist");

// Add songs to playlist
musicApp.addSongToPlaylist("My Playlist", "Song Title");

// Connect audio device
musicApp.connectAudioDevice(DeviceType.BLUETOOTH);

// Select playback strategy
musicApp.selectPlaylistStrategy(PlaylistStrategyType.SEQUENTIAL);

// Load and play playlist
musicApp.loadPlaylist("My Playlist");
musicApp.playAllsongs();

// Navigate playlist
musicApp.playNextSongInPlaylist();
musicApp.playPreviousSongInPlaylist();
```

### Playback Strategies

#### Sequential Strategy
```typescript
musicApp.selectPlaylistStrategy(PlaylistStrategyType.SEQUENTIAL);
musicApp.playNextSongInPlaylist(); // Plays songs in order
```

#### Random Strategy
```typescript
musicApp.selectPlaylistStrategy(PlaylistStrategyType.RANDOM);
musicApp.playNextSongInPlaylist(); // Plays random songs (no repeats until all played)
```

#### Custom Strategy
```typescript
musicApp.selectPlaylistStrategy(PlaylistStrategyType.CUSTOM);
musicApp.queueNextsong("Specific Song Title"); // Queue specific songs
musicApp.playNextSongInPlaylist(); // Plays from queue
```

### Device Management

```typescript
// Switch between different audio output devices
musicApp.connectAudioDevice(DeviceType.BLUETOOTH);
musicApp.connectAudioDevice(DeviceType.WIRED);
musicApp.connectAudioDevice(DeviceType.HEADPHONES);
```

## Installation

```bash
npm install
```

## Development

This project uses Prettier for code formatting:

```bash
npm run format  # Format code with Prettier
```

## Key Components

### MusicPlayerApplication
High-level API that manages the song library and delegates to `MusicPlayerFascade` and `PlaylistManager`.

**Key Methods:**
- `createSong(title, artist, filePath)`: Add songs to library
- `createPlaylist(name)`: Create new playlist
- `addSongToPlaylist(playlistName, songTitle)`: Add song to playlist
- `connectAudioDevice(deviceType)`: Connect audio output device
- `selectPlaylistStrategy(strategyType)`: Choose playback strategy
- `loadPlaylist(name)`: Load playlist for playback
- `playAllsongs()`: Play all songs in loaded playlist

### AudioEngine
Low-level audio control that tracks the current song and pause state, delegating actual playback to the connected device.

### PlaylistManager
Manages playlist CRUD operations with in-memory storage (Map-based), validates song uniqueness within playlists.

### DeviceManager
Maintains the current audio output device and uses the factory to create device instances.

### StrategyManager
Instantiates and provides appropriate playback strategies based on type.

## Extension Points

The architecture is designed for easy extension:

1. **Add New Playback Strategy**: Extend `PlayStrategy` abstract class
2. **Add New Device Type**:
   - Create adapter implementing `IAudioOutputDevice`
   - Add external API class
   - Update `DeviceFactory` and `DeviceType` enum
3. **Add Persistence**: Implement repository pattern in `PlaylistManager`
4. **Add Audio Processing**: Extend `AudioEngine` with effects/equalizer

## Learning Objectives

This project demonstrates:

- Clean Architecture principles
- SOLID design principles
- Gang of Four design patterns
- TypeScript best practices
- Singleton pattern for resource management
- Interface segregation and dependency inversion
- Separation of concerns

## Notes

- External device APIs are mocked (console.log output only)
- No actual audio playback implementation
- Designed for learning and demonstration purposes
- All data stored in-memory (no persistence)


## Author

Created as a demonstration of software design patterns and clean architecture in TypeScript.
