import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {
  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {}

  _handleDeleteClick(index) {
    this._stateService.state.saved_games.splice(index, 1);
  }
}
