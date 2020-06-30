import { Query } from '@datorama/akita';
import { UiStore, UiState, uiStore } from './ui.store';

export class UiQuery extends Query<UiState> {
  debug_showTokensPanel$ = this.select((state) => state.debug_showTokensPanel);

  constructor(protected store: UiStore) {
    super(store);
  }
}

export const uiQuery = new UiQuery(uiStore);
