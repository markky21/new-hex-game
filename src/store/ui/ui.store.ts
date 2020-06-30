import { Store, StoreConfig } from '@datorama/akita';

export interface UiState {
  debug_showTokensPanel: boolean;
}

export function createInitialState(): UiState {
  return {
    debug_showTokensPanel: true,
  };
}

@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {
  constructor() {
    super(createInitialState());
  }
}

export const uiStore = new UiStore();
