import {
  Ship,
  FireInfo,
  IMove,
  IAccelerate,
  IAttack,
  CommandType,
  Vector,
  Attack,
  Move,
  BlockType,
  GunBlock,
  Accelerate,
} from "./model";

export interface BattleInput {
  My: Array<Ship>;
  Opponent: Array<Omit<Ship, "energy" | "equipment">>;
  FireInfos: Array<FireInfo>;
}
export interface BattleOutput {
  UserCommands: Array<IMove | IAccelerate | IAttack>;
  Message: string;
}

export class Battle implements BattleInput {
  My: Array<Ship>;
  Opponent: Array<Omit<Ship, "energy" | "equipment">>;
  FireInfos: Array<FireInfo>;

  constructor(input: BattleInput) {
    ({
      My: this.My,
      Opponent: this.Opponent,
      FireInfos: this.FireInfos,
    } = input);
  }

  run(message: string = ""): BattleOutput {
    const out = {
      UserCommands: [],
      Message: message,
    } as BattleOutput;
    const opponentPositions = this.Opponent.map((s) => new Vector(s.Position));

    for (const s of this.My) {
      const gun = s.Equipment.find((e) => e.Type === BlockType.Gun) as GunBlock;

      // Move to first
      out.UserCommands.push(
        Move({ Id: s.Id, Target: opponentPositions[0].string() })
      );

      // Attack first
      out.UserCommands.push(
        Attack({
          Id: s.Id,
          Name: gun.Name,
          Target: opponentPositions[0].string(),
        })
      );
    }
    return out;
  }
}
