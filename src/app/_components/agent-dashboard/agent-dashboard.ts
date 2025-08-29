import { Component, inject } from '@angular/core';
import { UserStateService } from '../../_services/user-state-service';

@Component({
  selector: 'app-agent-dashboard',
  imports: [],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.scss'
})
export class AgentDashboard {
  readonly userStateService = inject(UserStateService);
}
