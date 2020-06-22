import {
    AttackTypesEnum,
    EnhancementTypesEnum,
    TokenTypesEnum
} from "../../../modules/canvas/components/Token/Token";
import {CommonActionsEnum} from "../../common.actions.model";
import {ArmyTokenSet} from "../army.token.set.model";

export const BorgoTokens: ArmyTokenSet = {
    actionTokens: [
        {
        token: {
            type: TokenTypesEnum.ACTION,
            effect: CommonActionsEnum.BATTLE
        },
        amount: 6
        },
        {
        token: {
            type: TokenTypesEnum.ACTION,
            effect: CommonActionsEnum.MOVE
        },
        amount: 4
        },
        {
            token: {
            type: TokenTypesEnum.ACTION,
            effect: 'GRENADE'
        },
        amount: 1
    }
    ,
    ],
    soldierTokens: [
        {
            token: {
              name: 'Mutty',
              attacks: [
                  {
                      strength: 1,
                      dir: 0,
                      type: AttackTypesEnum.MELEE
                  },
                  {
                      strength: 1,
                      dir: 1,
                      type: AttackTypesEnum.MELEE
                  },
                  {
                      strength: 1,
                      dir: 2,
                      type: AttackTypesEnum.MELEE
                  },
              ],
              hp: 1,
                speed: 2
            },
            amount: 6
        },
        {
            token: {
                name: 'Cutler',
                attacks: [
                    {
                        dir: 0,
                        strength: 1,
                        type: AttackTypesEnum.MELEE
                    }
                ],
                speed: 3,
                hp: 1
            },
            amount: 4
        },
        {
            token: {
                name: 'Webmaster',
                speed: 1,
                hp: 1,
                attacks: [
                {
                    dir: 3,
                    strength: 3,
                    type: AttackTypesEnum.MELEE
                },
                ],

            },
            amount:  2
        },
        {
            token: {
                name: 'Super-mutant',
                hp: 2,
                speed: 2,
                shield: [0, 1, 2],
                attacks: [
                    {
                        dir: 0,
                        strength: 1,
                        type: AttackTypesEnum.MELEE
                    },
                    {
                        dir: 1,
                        strength: 2,
                        type: AttackTypesEnum.MELEE
                    },
                    {
                        dir: 2,
                        strength: 1,
                        type: AttackTypesEnum.MELEE
                    },
                ]
            },
            amount: 1
        },
        {
            token: {
                name: 'Musclehead',
                speed: 2,
                hp: 1,
                attacks: [
                    { dir: 1, strength: 2, type: AttackTypesEnum.MELEE}
                ]
            },
            amount: 2
        },

        {
            token: {
                name: 'Killer',
                speed: 3,
                enableMovement: true,
                attacks: [
                    { dir: 0, strength: 1, type: AttackTypesEnum.SHOT }
                ]
            },
            amount: 2
        }
    ],
    enhancements: [
        {
            token: {
                name: 'Medic',
                hp: 1,
                enhancements: [
                    {
                        dirs: [ 0, 1, 2],
                        strength: 1,
                        type: EnhancementTypesEnum.HP
                    }
                ]
            },
            amount: 1
        },
        {
            token: {
                name: 'Officer',
                hp: 1,
                enhancements: [
                    {
                        dirs: [ 0, 1, 2],
                        strength: 1,
                        type: EnhancementTypesEnum.MELEE
                    }
                ]
            },
            amount: 2
        },
        {
            token: {
                name: 'Super-officer',
                enhancements: [
                    {
                        dirs: [ 0, 1, 2],
                        strength: 1,
                        type: EnhancementTypesEnum.HP
                    }
                ],
                hp: 2
            },
            amount: 1
        },
        {
            token: {
                name: 'Scout',
                hp: 1,
                enhancements: [
                    {
                        dirs: [0, 1, 2],
                        strength: 1,
                        type: EnhancementTypesEnum.SPEED
                    }
                ]
            },
            amount: 2
        },
    ]
}
