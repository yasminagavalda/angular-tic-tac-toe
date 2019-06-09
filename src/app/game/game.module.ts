import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { StateService } from './state.service';
import { MovementsCounterComponent } from './movements-counter/movements-counter.component';
import { ResetComponent } from './reset/reset.component';
import { FormsModule } from '@angular/forms';
import { SaveComponent } from './save/save.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GameComponent,
    HeaderComponent,
    BoardComponent,
    SquareComponent,
    MovementsCounterComponent,
    ResetComponent,
    SaveComponent,
    SavedGamesComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [GameComponent],
  providers: [StateService]
})
export class GameModule {}
