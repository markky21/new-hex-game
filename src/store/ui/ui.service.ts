import { ID } from '@datorama/akita';
import { UiStore, uiStore } from './ui.store';

export class UiService {

  constructor(private uiStore: UiStore) {
  }

}

export const uiService = new UiService(uiStore);