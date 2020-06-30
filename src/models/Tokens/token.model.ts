import { ArmyTokenSet } from '../../classes/token.classes';
import { Army } from '../hex.model';
import { TokenBorgoModel } from './token-borgo.model';
import { TokenMolochModel } from './token-moloch.model';

export const ArmyTokensFootprint = new Map<string, ArmyTokenSet>();

ArmyTokensFootprint.set(Army.BORGO, TokenBorgoModel);
ArmyTokensFootprint.set(Army.MOLOCH, TokenMolochModel);
