import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule,
         MatButtonModule,
         MatRadioModule,
         MatSnackBarModule,
         MatInputModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SnackService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GamePageComponent } from './game-page/game-page.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        GamePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    providers: [SnackService],
    bootstrap: [AppComponent]
})
export class AppModule { }
