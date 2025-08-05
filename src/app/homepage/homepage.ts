import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth-service';
import { MapComponent } from "../map-component/map-component";
import { TestButtons } from '../test-buttons/test-buttons';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, TestButtons],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  protected readonly authService = inject(AuthService);
}
