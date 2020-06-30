import { Query } from '@datorama/akita';
import { UiStore, UiState, uiStore } from './ui.store';

export class UiQuery extends Query<UiState> {

  constructor(protected store: UiStore) {
    super(store);
  }

}

export const uiQuery = new UiQuery(uiStore);