export type VectorString = string;
export class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(value: VectorString);
  constructor(x: number, y: number, z: number);
  constructor(value: any, y?: any, z?: any) {
    if (typeof value === "string") {
      [this.x, this.y, this.z] = value.split("/").map((v) => parseInt(v, 10));
    } else {
      this.x = value;
      this.y = y;
      this.z = z;
    }
  }

  get clen() {
    return Math.max(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }
  get mlen() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  sub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  distance(v: Vector) {
    const d = new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    return Math.pow(
      Math.pow(d.x, 2) + Math.pow(d.y, 2) + Math.pow(d.z, 2),
      1 / 2
    );
  }
  string(): VectorString {
    return `${this.x}/${this.y}/${this.z}`;
  }
}
export enum BlockType {
  Energy,
  Gun,
  Engine,
  Health,
}
export type BlockName = string;
export interface Block {
  Type: BlockType;
  Name: BlockName;
}
export interface HealthBlock extends Block {
  Type: BlockType.Health;
  MaxHealth: number;
  StartHealth: number;
}
export interface EnergyBlock extends Block {
  Type: BlockType.Energy;
  IncrementPerTurn: number;
  MaxEnergy: number;
  StartEnergy: number;
}
export interface EngineBlock extends Block {
  Type: BlockType.Engine;
  MaxAccelerate: number;
}
export interface GunBlock extends Block {
  Type: BlockType.Gun;
  Damage: number;
  EnergyPrice: number;
  Radius: number;
  EffectType: number;
}
export type Blocks = HealthBlock | EnergyBlock | EngineBlock | GunBlock;

export interface FireInfo {
  Source: VectorString;
  Target: VectorString;
  EffectType: number;
}

export interface Ship {
  Id: number;
  Health: number;
  Energy: number;
  Position: VectorString;
  Velocity: VectorString;
  Equipment: Array<Blocks>;
}

export enum CommandType {
  MOVE = "MOVE",
  ACCELERATE = "ACCELERATE",
  ATTACK = "ATTACK",
}
export interface MoveParams {
  Id: number;
  Target: VectorString;
}
export interface AccelerateParams {
  Id: number;
  Vector: VectorString;
}
export interface AttackParams {
  Id: number;
  Name: string;
  Target: VectorString;
}
export interface IMove {
  Command: CommandType.MOVE;
  Parameters: MoveParams;
}
export interface IAccelerate {
  Command: CommandType.ACCELERATE;
  Parameters: AccelerateParams;
}
export interface IAttack {
  Command: CommandType.ATTACK;
  Parameters: MoveParams;
}

export function Move(params: MoveParams): IMove {
  return { Command: CommandType.MOVE, Parameters: params };
}

export function Accelerate(params: AccelerateParams): IAccelerate {
  return { Command: CommandType.ACCELERATE, Parameters: params };
}

export function Attack(params: AttackParams): IAttack {
  return { Command: CommandType.ATTACK, Parameters: params };
}

export type CompleteShipId = string;

export interface DraftEquipment {
  Size: number;
  Equipment: Array<Blocks>;
}
export interface DraftCompleteShip {
  Id: CompleteShipId;
  Price: number;
  Equipment: Array<BlockName>;
}

export interface DraftShipChoice {
  Position: VectorString;
  CompleteShipId: CompleteShipId;
}
