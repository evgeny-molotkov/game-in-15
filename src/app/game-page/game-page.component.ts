import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackService } from '../services';
import { Dominoe,
         Position } from '../models';

const CELL_SIZE_PX = 64;
const WIN_MESSAGE = 'Вы выйграли';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

    private querySubscription: Subscription;

    public dominoesCount = 15;
    public shakeMoves = 0;
    public fieldSize = 0;
    public emptyDominoe = new Dominoe;
    public dominoes = new Array<Dominoe>();
    public movePos = new Array<Position>();

    constructor(
        private route: ActivatedRoute,
        private snackService: SnackService
    ) {
        this.movePos.push(new Position(1, 0));
        this.movePos.push(new Position(0, 1));
        this.movePos.push(new Position(-1, 0));
        this.movePos.push(new Position(0, -1));

        this.dominoesCount = +this.route.snapshot.paramMap.get('dominoesCount');

        this.fieldSize = this.getFieldSize(this.dominoesCount);

        this.emptyDominoe.Position = this.dominoesCount;
        this.emptyDominoe.Value = null;

        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.shakeMoves = queryParam['shakeMoves'];
                if (isNaN(this.shakeMoves)) {
                    this.shakeMoves = 1;
                }
                this.initDominoes();
                this.shakeGameField(this.shakeMoves);
            }
        );
    }

    ngOnInit() {
    }

    getFieldSize(count = 1): number {
        return Math.sqrt(count + 1);
    }

    getFieldSizePx(size = 1): number {
        return size * CELL_SIZE_PX;
    }

    initDominoes() {
        this.dominoes = [];
        for (let i = 0; i < this.dominoesCount; i++) {
            this.dominoes.push(new Dominoe(i + 1, i));
        }
    }

    getPositionX(pos: number): number {
        return pos % this.fieldSize;
    }

    getPositionY(pos: number): number {
        return Math.floor(pos / this.fieldSize);
    }

    getXDeltaPx(pos: number): number {
        return this.getPositionX(pos) * CELL_SIZE_PX;
    }

    getYDeltaPx(pos: number): number {
        return this.getPositionY(pos) * CELL_SIZE_PX;
    }

    onClickDominoe(elem: Dominoe) {
        if (!this.canMove(elem.Position)) {
            return;
        }

        const tmpPos = this.emptyDominoe.Position;
        this.emptyDominoe.Position = elem.Position;
        elem.Position = tmpPos;

        if (this.checkWin()) {
            this.snackService.show.next(WIN_MESSAGE);
        }
    }

    canMove(pos: number): boolean {
        let result = false;

        this.movePos.forEach(element => {
            const xPos = this.getPositionX(pos) + element.X;
            const yPos = this.getPositionY(pos) + element.Y;

            if ( this.getPositionX(this.emptyDominoe.Position) === xPos &&
                 this.getPositionY(this.emptyDominoe.Position) === yPos) {
                result = true;
            }
        });

        return result;
    }

    checkWin(): boolean {
        for (let i = 0; i < this.dominoes.length; i++) {
            if (this.dominoes[i].Position + 1 !== this.dominoes[i].Value) {
                return false;
            }
        }

        return true;
    }

    shakeGameField(count: number) {
        let prevPos = this.emptyDominoe.Position;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < 20; j++) {
                const rand = Math.floor(Math.random() * 4);
                const xPos = this.getPositionX(this.emptyDominoe.Position) + this.movePos[rand].X;
                const yPos = this.getPositionY(this.emptyDominoe.Position) + this.movePos[rand].Y ;
                if ( (xPos < 0) || (xPos >= this.fieldSize) ) {
                    continue;
                }
                if ( (yPos < 0) || (yPos >= this.fieldSize) ) {
                    continue;
                }
                const position = xPos + yPos * this.fieldSize;
                if ( (position >= 0) && (position < this.fieldSize * this.fieldSize) && prevPos !== position) {
                    prevPos = this.emptyDominoe.Position;
                    for (let k = 0; k < this.dominoes.length; k++) {
                        if (this.dominoes[k].Position === position) {
                            this.dominoes[k].Position = this.emptyDominoe.Position;
                        }
                    }
                    this.emptyDominoe.Position = position;
                    break;
                }
            }
        }
    }

}
