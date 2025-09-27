import { Component, inject } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserStateService } from '../../_services/user-state-service';
import { InsertionForSaleUpload } from "../insertion-upload/insertion-for-sale-upload/insertion-for-sale-upload";
import { InsertionForRentUpload } from "../insertion-upload/insertion-for-rent-upload/insertion-for-rent-upload";
import { AgencyInfo } from "../agency-info/agency-info";

@Component({
  selector: 'app-agent-dashboard',
  imports: [InsertionForSaleUpload, InsertionForRentUpload, NgbNavModule, AgencyInfo],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.scss'
})
export class AgentDashboard {
  readonly userStateService = inject(UserStateService);
  active = 1;
}
