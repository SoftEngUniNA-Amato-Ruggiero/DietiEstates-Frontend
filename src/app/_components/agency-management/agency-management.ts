import { Component, inject } from '@angular/core';
import { UserServiceClient } from '../../_services/user-service-client';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../_dto/user';

@Component({
  selector: 'app-agency-management',
  imports: [ReactiveFormsModule],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss'
})
export class AgencyManagement {
  protected userServiceClient = inject(UserServiceClient);

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
    this.userServiceClient.postAgent(new User(email)).subscribe({
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
