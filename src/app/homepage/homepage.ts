import { Component, inject } from '@angular/core';
import { MapComponent } from "../map-component/map-component";
import { TestButtons } from '../test-buttons/test-buttons';
import { AuthService } from '../_services/auth-service';
import { AgencyUpload } from '../agency-upload/agency-upload';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, TestButtons, AgencyUpload],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  authService = inject(AuthService);
}
