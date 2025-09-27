import { Component, inject } from '@angular/core';
import { AgentsList } from './agents-list/agents-list';
import { UserStateService } from '../../_services/user-state-service';
import { UserPromotionForms } from './user-promotion-forms/user-promotion-forms';
import { AgencyInfo } from "../agency-info/agency-info";

@Component({
  selector: 'app-agency-management',
  imports: [AgentsList, UserPromotionForms, AgencyInfo],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss'
})
export class AgencyManagement {
  protected userStateService = inject(UserStateService);
  protected updateTrigger = false;

  protected onFormSubmitted() {
    this.updateTrigger = !this.updateTrigger;
  }
}
