import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    dominoesCount = 15;
    dominoes = [3, 8, 15, 24, 48];
    shakeMoves = 3;

    constructor() {
    }

    ngOnInit() {
    }

}
