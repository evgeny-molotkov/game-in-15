import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    dominoesCount: number;
    dominoes = [3, 8, 15, 24, 48];

    constructor() {
        this.dominoesCount = 15;
    }

    ngOnInit() {
    }

}
