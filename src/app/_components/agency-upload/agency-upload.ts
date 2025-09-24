import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendClientService } from '../../_services/backend-client-service';
import { UserStateService } from '../../_services/user-state-service';
import { RealEstateAgencyRequestDTO } from '../../_types/dtos';

@Component({
  selector: 'app-agency-upload',
  imports: [ReactiveFormsModule],
  templateUrl: './agency-upload.html',
  styleUrl: './agency-upload.scss'
})
export class AgencyUpload {
  private readonly client = inject(BackendClientService);
  private readonly userStateService = inject(UserStateService);

  protected agencyUploadForm = new FormGroup({
    agencyIban: new FormControl(''),
    agencyName: new FormControl(''),
  });

  protected onSubmit() {
    if (this.agencyUploadForm.valid && this.agencyUploadForm.value?.agencyIban && this.agencyUploadForm.value?.agencyName) {
      const agency = new RealEstateAgencyRequestDTO(this.agencyUploadForm.value.agencyIban, this.agencyUploadForm.value.agencyName);

      console.log("submitted agency:\n", agency);

      this.client.postAgency(agency).subscribe({
        next: (response) => {
          console.log('Agency created:', response);
          this.userStateService.uploadAgencyResponseSignal.set(response);
        },
        error: (error) => {
          console.error('Error uploading agency:', error);
        }
      });
    }
  }
}
