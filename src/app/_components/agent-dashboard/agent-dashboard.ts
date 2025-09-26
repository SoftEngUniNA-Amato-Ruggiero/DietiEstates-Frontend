import { Component, inject } from '@angular/core';
import { UserStateService } from '../../_services/user-state-service';
import { InsertionForSaleUpload } from "../insertion-upload/insertion-for-sale-upload/insertion-for-sale-upload";

@Component({
  selector: 'app-agent-dashboard',
  imports: [InsertionForSaleUpload],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.scss'
})
export class AgentDashboard {
  readonly userStateService = inject(UserStateService);
}
