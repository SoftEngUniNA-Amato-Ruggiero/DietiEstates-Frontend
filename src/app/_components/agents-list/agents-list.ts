import { Component, effect, inject, signal } from '@angular/core';
import { BackendClientService } from '../../_services/backend-client-service';
import { UserStateService } from '../../_services/user-state-service';
import { UserWithAgency } from '../../_types/user-with-agency';

@Component({
  selector: 'app-agents-list',
  imports: [],
  templateUrl: './agents-list.html',
  styleUrl: './agents-list.scss'
})
export class AgentsList {
  readonly client = inject(BackendClientService);
  readonly userState = inject(UserStateService);

  readonly agents = signal<UserWithAgency[]>([]);
  readonly pageNumber = signal<number>(0);
  readonly pageSize = signal<number>(10);
  readonly totalPages = signal<number>(0);

  constructor() {
    effect(() => {
      if (this.userState.agency()) {
        this.getAgentsPage(this.pageNumber(), this.pageSize());
      }
    });
  }

  getAgentsPage(pageNumber = 0, pageSize = 10) {
    this.client.getAgentsWorkingForAgency(this.userState.agency()?.id!, pageNumber, pageSize).subscribe(
      response => {
        this.agents.set(response.content ?? []);
        this.pageNumber.set(response.page.number);
        this.pageSize.set(response.page.size);
        this.totalPages.set(response.page.totalPages);
      }
    );
  }
}
