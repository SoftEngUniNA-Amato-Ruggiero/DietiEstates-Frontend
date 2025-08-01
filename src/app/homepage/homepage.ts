import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthService } from '../_services/auth-service';
import { MapComponent } from "../map-component/map-component";

@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, JsonPipe, MapComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  protected readonly authService = inject(AuthService);
}
