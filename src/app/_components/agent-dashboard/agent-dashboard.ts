import { Component, inject } from '@angular/core';
import { UserStateService } from '../../_services/user-state-service';
import { InsertionUpload } from "../insertion-upload/insertion-upload";

@Component({
  selector: 'app-agent-dashboard',
  imports: [InsertionUpload],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.scss'
})
export class AgentDashboard {
  readonly userStateService = inject(UserStateService);
}
