import { ID } from '@datorama/akita';
import {UiStore, uiStore} from "./ui.store";

export class UiService {
  constructor(private uiStore: UiStore) {}

  updateDebugShowTokensPanel(value: boolean) {
    this.uiStore.update({ debug_showTokensPanel: value });
  }
}

export const uiService = new UiService(uiStore);
