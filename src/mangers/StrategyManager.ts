import { PlaylistStrategyType } from '../enums/PlaylistStrategyType';
import { CustomStrategy } from '../strategies/CustomStrategy';
import { PlayStrategy } from '../strategies/Playstrategy';
import { RandomStrategy } from '../strategies/RandomStrategy';
import { SequentialStrategy } from '../strategies/SequentialStrategy';

class StrategyManager {
  private static instance: StrategyManager;
  private sequentialStrategy!: SequentialStrategy;
  private randomStrategy!: RandomStrategy;
  private customStrategy!: CustomStrategy;

  constructor() {
    this.sequentialStrategy = new SequentialStrategy();
    this.randomStrategy = new RandomStrategy();
    this.customStrategy = new CustomStrategy();
  }

  static getInstance(): StrategyManager {
    if (StrategyManager.instance == undefined) {
      StrategyManager.instance = new StrategyManager();
    }
    return StrategyManager.instance;
  }

  playStrategy(strategyType: PlaylistStrategyType): PlayStrategy {
    if (strategyType == PlaylistStrategyType.SEQUENTIAL) {
      return this.sequentialStrategy;
    } else if (strategyType == PlaylistStrategyType.RANDOM) {
      return this.randomStrategy;
    } else if (strategyType == PlaylistStrategyType.CUSTOM) {
      return this.customStrategy;
    } else {
      return this.sequentialStrategy;
    }
  }
}

export { StrategyManager };
