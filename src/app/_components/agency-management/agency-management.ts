import { Component, inject } from '@angular/core';
import { BackendClientService } from '../../_services/backend-client-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../_types/user';

@Component({
  selector: 'app-agency-management',
  imports: [ReactiveFormsModule],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss'
})
export class AgencyManagement {
  protected client = inject(BackendClientService);

  protected postAgentForm = new FormGroup({
    email: new FormControl(''),
  });

  protected postManagerForm = new FormGroup({
    email: new FormControl(''),
  });

  protected postAgent(email: string | null | undefined) {
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
      }
    });
  }

  protected postManager(email: string | null | undefined) {
    if (!email) {
      console.error('Invalid email');
      return;
    }
    //TODO: implement once userServiceClient has a postManager method
    console.log("nothing yet");
  }
}
