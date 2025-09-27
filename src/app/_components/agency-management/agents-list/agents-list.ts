import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BackendClientService } from '../../../_services/backend-client-service';
import { UserStateService } from '../../../_services/user-state-service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserResponseDTO } from "../../../_types/users/UserResponseDTO";
import { RoleDTO } from '../../../_types/RoleDTO';

@Component({
  selector: 'app-agents-list',
  imports: [NgbPaginationModule],
  templateUrl: './agents-list.html',
  styleUrl: './agents-list.scss'
})
export class AgentsList implements OnChanges {
  @Input() updateTrigger = false;

  protected readonly client = inject(BackendClientService);
  protected readonly userState = inject(UserStateService);

  protected agents = new Array<UserResponseDTO>();
  protected pageNumber = 0;
  protected pageSize = 10;
  protected totalPages = 0;

  constructor() {
    effect(() => {
      if (this.userState.agency()) {
        this.getAgentsPage(this.pageNumber, this.pageSize);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateTrigger']) {
      this.getAgentsPage(0, 10);
    }
  }

  protected getAgentsPage(pageNumber = 0, pageSize = 10) {
    this.client.getAgentsWorkingForAgency(this.userState.agency()?.id!, pageNumber, pageSize).subscribe(
      response => {
        this.agents = response.content ?? [];
        this.pageSize = response.page?.size ?? pageSize;
        this.totalPages = response.page?.totalPages ?? 0;
      }
    );
  }

  protected getRolesNames(roles: Array<RoleDTO>): Array<string> {
    return roles.map(r => r.name);
  }
}
