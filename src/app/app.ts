import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('DietiEstatesFrontend');
  protected readonly authService = inject(AuthService);
}
