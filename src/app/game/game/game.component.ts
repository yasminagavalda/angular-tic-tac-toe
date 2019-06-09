import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StateService, State } from './../state.service';

import { MyhttpService } from './../../myhttp.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private _status = 'fetching';
  private _player_name = '';
  private _game_name = '';
  private _stateService: StateService;
  private _myhttpService: MyhttpService;

  constructor(private route: ActivatedRoute, stateService: StateService, myhttpService: MyhttpService) {
    this._stateService = stateService;
    this._myhttpService = myhttpService;
    if (route.snapshot.data.continue) {
      const continueId = this.route.snapshot.paramMap.get('id');
      let id = continueId || 'i216a';
      if (!continueId && this._stateService.state.saved_games.length) {
        id = this._stateService.state.saved_games[this._stateService.state.saved_games.length - 1].id;
      }
      this._stateService.state.continue_uri = `https://api.myjson.com/bins/${id}`;
      myhttpService.getSavedGame().subscribe(
        (state: State) => {
          // The fixed saved game (i216a) does not have movements and winner properties
          if (!state.movements) {
            state.movements = state.values.reduce((acc, row) => {
              const countRow = row.reduce((accRow, value) => (value !== '-' ? accRow + 1 : accRow), 0);
              return countRow + acc;
            }, 0);
          }
          if (!state.winner) {
            state.winner = '';
          }
          state.saving = stateService.state.saving;
          state.saved_games = stateService.state.saved_games;
          stateService.state = state;
          this._status = 'SUCCESS';
        },
        error => (this._status = error.statusText)
      );
    } else {
      stateService.reset();
      this._status = 'SUCCESS';
    }
  }

  _handleSubmitClick() {
    this._stateService.state.player_name = this._player_name;
  }

  _handleSaveClick() {
    this._stateService.state.game_name = this._game_name;
    this._myhttpService.saveGame().subscribe(
      (data: any) => {
        const game = { game_name: this._stateService.state.game_name, id: data.uri.split('/').pop() };
        this._stateService.state.saved_games = [...this._stateService.state.saved_games, game];
        this._stateService.state.saving = false;
      },
      error => console.log('Error saving game ', error)
    );
  }

  ngOnInit() {}
}
