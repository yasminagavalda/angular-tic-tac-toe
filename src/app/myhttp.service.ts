import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateService } from './game/state.service';

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {
  constructor(private httpClient: HttpClient, private stateService: StateService) {}

  getSavedGame() {
    return this.httpClient.get(this.stateService.state.continue_uri);
  }

  saveGame() {
    const { turn, values, movements, winner, player_name, game_name } = this.stateService.state;
    const game = { turn, values, movements, winner, player_name, game_name };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post('https://api.myjson.com/bins', game, httpOptions);
  }
}
