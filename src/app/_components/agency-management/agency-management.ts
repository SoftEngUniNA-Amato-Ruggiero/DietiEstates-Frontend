import { Component, inject } from '@angular/core';
import { BackendClientService } from '../../_services/backend-client-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../_types/user';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { AgentsList } from '../agents-list/agents-list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agency-management',
  imports: [ReactiveFormsModule, AgentsList],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss'
})
export class AgencyManagement {
  protected client = inject(BackendClientService);
  protected authService = inject(AuthService);
  protected userStateService = inject(UserStateService);
  protected toastr = inject(ToastrService);

  protected agentForm = new FormGroup({
    email: new FormControl(''),
  });

  protected managerForm = new FormGroup({
    email: new FormControl(''),
  });

  protected submitAgentForm(email: string | null | undefined) {
    if (!email) {
      console.error('Invalid email');
      return;
    }
    this.client.postAgent(new User(email)).subscribe({
      next: (response) => {
        console.log('Agent created:', response);
      },
      error: (error) => {
        console.error('Error creating agent:', error);
        this.toastr.error(error.error.message);
      }
    });
  }

  protected submitManagerForm(email: string | null | undefined) {
    if (!email) {
      console.error('Invalid email');
      return;
    }
    this.client.postManager(new User(email)).subscribe({
      next: (response) => {
        console.log('Manager created:', response);
      },
      error: (error) => {
        console.error('Error creating manager:', error);
        this.toastr.error(error.error.message);
      }
    });
  }
}
