import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Игра в пятнашки';

    constructor(
        private snackService: SnackService,
        public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.snackService.show.subscribe(
            (message: string) => {
                this.snackBar.open(message, '', {
                    duration: 5000,
                    panelClass: 'win-message'
                });
            }
        );
    }
}
