import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendClientService } from '../../_services/backend-client-service';
import { Agency } from '../../_types/agency';
import { AuthService } from '../../_services/auth-service';
import { ROLE } from '../../_types/roles';

@Component({
  selector: 'app-agency-upload',
  imports: [ReactiveFormsModule],
  templateUrl: './agency-upload.html',
  styleUrl: './agency-upload.scss'
})
export class AgencyUpload {
  private readonly client = inject(BackendClientService);
  private readonly authService = inject(AuthService);

  protected agencyUploadForm = new FormGroup({
    agencyName: new FormControl(''),
    agencyIban: new FormControl(''),
  });

  protected onSubmit() {
    if (this.agencyUploadForm.valid && this.agencyUploadForm.value?.agencyIban && this.agencyUploadForm.value?.agencyName) {
      const agency = new Agency(this.agencyUploadForm.value.agencyIban, this.agencyUploadForm.value.agencyName);

      this.client.postAgency(agency).subscribe({
        next: (response) => {
          console.log('Agency created:', response);
          this.authService.roleSignal.set(ROLE.MANAGER);
        },
        error: (error) => {
          console.error('Error uploading agency:', error);
        }
      });
    }
  }
}
