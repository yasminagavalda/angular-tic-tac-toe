import { Component, OnInit } from "@angular/core";
import { StateService } from "./../state.service";

@Component({
  selector: "app-movements-counter",
  templateUrl: "./movements-counter.component.html",
  styleUrls: ["./movements-counter.component.css"]
})
export class MovementsCounterComponent implements OnInit {
  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {}
}
