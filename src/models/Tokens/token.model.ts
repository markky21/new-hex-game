import { ArmyTokenSet, TokenBaseClass } from '../../classes/token.classes';
import { Army } from '../hex.model';
import { BorgoBase, TokenBorgoModel } from './token-borgo.model';
import { MolochBase, TokenMolochModel } from './token-moloch.model';

export const ArmyTokensFootprint = new Map<string, ArmyTokenSet>();
export const ArmyBase = new Map<string, TokenBaseClass>();

ArmyTokensFootprint.set(Army.BORGO, TokenBorgoModel);
ArmyTokensFootprint.set(Army.MOLOCH, TokenMolochModel);

ArmyBase.set(Army.BORGO, new BorgoBase());
ArmyBase.set(Army.MOLOCH, new MolochBase());
