import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AdvancedSearch } from "../advanced-search/advanced-search";

@Component({
  selector: 'app-homepage',
  imports: [
    AgencyUpload,
    AdvancedSearch
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  readonly authService = inject(AuthService);
  readonly userStateService = inject(UserStateService);
}
