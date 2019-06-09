import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Game {
  game_name: string;
  id: string;
}
export interface State {
  turn: string;
  values: string[][];
  movements: number;
  winner: string;
  player_name: string;
  saved_games: Game[];
  saving: boolean;
  game_name: string;
  continue_uri: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _state$: BehaviorSubject<State>;

  constructor() {
    this._state$ = new BehaviorSubject({
      turn: 'PLAYERX',
      values: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
      movements: 0,
      winner: '',
      player_name: '',
      saved_games: [],
      saving: false,
      game_name: '',
      continue_uri: ''
    });
  }

  get state$(): BehaviorSubject<State> {
    return this._state$;
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }

  updateValue(row, col) {
    if (this.state.values[row][col] === '-') {
      const player = this.state.turn === 'PLAYERX' ? 'X' : '0';
      const newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = player;
      this.state.turn = newTurn;
      this.state.movements += 1;
      this.checkWinner(player);
    }
  }

  checkWinner(player) {
    const playerWins = this.checkRows(player) || this.checkColumns(player) || this.checkDiagonals(player);
    if (playerWins) {
      this.state.winner = player;
    }
  }

  checkRows(player, values = this.state.values) {
    return values.find(row => {
      return row.every(value => value === player);
    });
  }

  checkColumns(player) {
    const transposedValues = this.transposeMatrix(this.state.values);
    return this.checkRows(player, transposedValues);
  }

  checkDiagonals(player) {
    const diagonals = this.getDiagonals(this.state.values);
    return this.checkRows(player, diagonals);
  }

  transposeMatrix(matrix) {
    return Object.keys(matrix[0]).map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
  }

  getDiagonals(matrix) {
    const loopConfig = [
      { firstIndex: 0, operation: this.addOne },
      { firstIndex: matrix.length - 1, operation: this.substractOne }
    ];
    return loopConfig.map(config => {
      return matrix.reduce(
        (prev, curr) => {
          const number = curr[prev.index];
          prev.diagonal.push(number);
          prev.index = config.operation(prev.index);
          return prev;
        },
        { diagonal: [], index: config.firstIndex }
      ).diagonal;
    });
  }

  addOne(number) {
    return (number += 1);
  }

  substractOne(number) {
    return (number -= 1);
  }

  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
      movements: 0,
      winner: '',
      player_name: '',
      saved_games: this.state.saved_games,
      saving: false,
      game_name: '',
      continue_uri: ''
    };
  }
}
