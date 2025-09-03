import { Component, inject } from '@angular/core';
import { MapComponent } from "../map-component/map-component";
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';

@Component({
  selector: 'app-homepage',
  imports: [MapComponent, AgencyUpload],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  readonly authService = inject(AuthService);
  readonly userStateService = inject(UserStateService);

  protected markerPosition: L.LatLng | undefined;

}
