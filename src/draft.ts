import {
  DraftCompleteShip,
  DraftEquipment,
  DraftShipChoice,
  Vector,
  VectorString,
} from "./model";

export interface DraftOptions {
  PlayerId: number;
  MapSize: number;
  Money: number;
  MaxShipsCount: number;
  DraftTimeout: number;
  BattleRoundTimeout: number;
  StartArea: {
    From: VectorString;
    To: VectorString;
  };
  Equipment: Array<DraftEquipment>;
  CompleteShips: Array<DraftCompleteShip>;
}

export interface DraftChoice {
  Ships: Array<DraftShipChoice>;
  Message: string;
}

export class Draft {
  options: DraftOptions;

  constructor(options: DraftOptions) {
    this.options = options;
  }

  run(message: string = "") {
    return {};
  }
}
