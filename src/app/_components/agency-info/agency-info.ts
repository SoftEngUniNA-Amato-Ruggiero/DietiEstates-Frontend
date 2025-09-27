import { Component, inject } from '@angular/core';
import { UserStateService } from '../../_services/user-state-service';

@Component({
  selector: 'app-agency-info',
  imports: [],
  templateUrl: './agency-info.html',
  styleUrl: './agency-info.scss'
})
export class AgencyInfo {
  protected readonly userStateService = inject(UserStateService);

}
