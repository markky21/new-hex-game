import { Store, StoreConfig } from '@datorama/akita';

export interface UiState {
  key: string;
}

export function createInitialState(): UiState {
  return {
    key: ''
  };
}

@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {

  constructor() {
    super(createInitialState());
  }

}

export const uiStore = new UiStore();

