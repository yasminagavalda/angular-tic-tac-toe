import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {}

  _handleSaveClick() {
    if (this._stateService.state.movements > 0) {
      this._stateService.state.saving = true;
    }
  }
}
