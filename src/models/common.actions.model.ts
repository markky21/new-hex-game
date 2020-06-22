import { ActionToken, TokenTypesEnum } from "../modules/canvas/components/Token/Token";

export enum CommonActionsEnum {
    MOVE = 'MOVE',
    ROTATE = 'ROTATE',
    BATTLE = 'BATTLE',
    PUSH = 'PUSH',
    SNIPER = 'SNIPER'
};

export type CommonActions = CommonActionsEnum.BATTLE | CommonActionsEnum.ROTATE | CommonActionsEnum.MOVE | CommonActionsEnum.PUSH | CommonActionsEnum.SNIPER;
//
// class MoveActionToken extends ActionToken {
//   constructor() {
//       super();
//       this.effect = CommonActionsEnum.MOVE
//   }
// }

const MoveActionToken = () => {
    const token = new ActionToken();

    token.effect = CommonActionsEnum.MOVE;
    return token;
}

const RotateActionToken = () => {
    const token = new ActionToken();

    token.effect = CommonActionsEnum.ROTATE;
    return token;
}
