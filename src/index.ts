import * as readline from "readline";
import { BattleInput, BattleOutput, Battle } from "./battle";
import { DraftOptions, Draft } from "./draft";

function makeTurn(battleState: BattleInput) {
  return new Battle(battleState).run();
}

function makeDraft(draftOptions: DraftOptions) {
  return new Draft(draftOptions).run();
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

function playGame() {
  rl.on("line", (line) => {
    const obj = JSON.parse(line);
    if (obj.hasOwnProperty("PlayerId")) {
      console.log(JSON.stringify(makeDraft(obj)));
    } else if (obj.hasOwnProperty("My")) {
      console.log(JSON.stringify(makeTurn(obj)));
    }
  });
}

playGame();
