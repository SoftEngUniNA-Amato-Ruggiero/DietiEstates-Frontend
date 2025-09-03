import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BackendClientService } from '../../../_services/backend-client-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../_types/user';
import { AuthService } from '../../../_services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-promotion-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './user-promotion-forms.html',
  styleUrl: './user-promotion-forms.scss'
})
export class UserPromotionForms {
  @Output() formSubmitted = new EventEmitter<void>();

  protected client = inject(BackendClientService);
  protected authService = inject(AuthService);
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
        this.toastr.success('Agent ' + email + ' now works for the agency.');
        this.formSubmitted.emit();
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
        this.toastr.success('Manager ' + email + ' now works for the agency.');
        this.formSubmitted.emit();
      },
      error: (error) => {
        console.error('Error creating manager:', error);
        this.toastr.error(error.error.message);
      }
    });
  }
}
