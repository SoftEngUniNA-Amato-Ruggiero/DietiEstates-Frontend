import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BackendClientService } from '../../../_services/backend-client-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../_services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { UserRequestDTO } from "../../../_types/users/UserRequestDTO";
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserStateService } from '../../../_services/user-state-service';

@Component({
  selector: 'app-user-promotion-forms',
  imports: [ReactiveFormsModule, NgbNavModule],
  templateUrl: './user-promotion-forms.html',
  styleUrl: './user-promotion-forms.scss'
})
export class UserPromotionForms {
  @Output() formSubmitted = new EventEmitter<void>();

  active = 1;

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
    this.client.postAgent(new UserRequestDTO(email)).subscribe({
      next: (response) => {
        console.log('Agent created:', response);
        this.toastr.success('Agent ' + email + ' now works for the agency.');
        this.formSubmitted.emit();
        if (this.userStateService.user()!.username === email) {
          window.location.reload();
        }
      },
      error: (error) => {
        console.error('Error creating agent:', error);
        this.toastr.error(error.error.message, 'Error creating agent:');
      }
    });
  }

  protected submitManagerForm(email: string | null | undefined) {
    if (!email) {
      console.error('Invalid email');
      return;
    }
    this.client.postManager(new UserRequestDTO(email)).subscribe({
      next: (response) => {
        console.log('Manager created:', response);
        this.toastr.success('Manager ' + email + ' now works for the agency.');
        this.formSubmitted.emit();
      },
      error: (error) => {
        console.error('Error creating manager:', error);
        this.toastr.error(error.error.message, 'Error creating manager:');
      }
    });
  }
}
