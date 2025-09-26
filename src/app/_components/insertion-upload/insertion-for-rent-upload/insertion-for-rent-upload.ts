import { Component, inject } from '@angular/core';
import { InsertionUpload } from "../base-insertion-upload/insertion-upload";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InsertionForRentRequestDTO } from '../../../_types/insertions/InsertionForRentRequestDTO';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';
import { BackendClientService } from '../../../_services/backend-client-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insertion-for-rent-upload',
  imports: [InsertionUpload, ReactiveFormsModule],
  templateUrl: './insertion-for-rent-upload.html',
  styleUrl: './insertion-for-rent-upload.scss'
})
export class InsertionForRentUpload {
  protected readonly client = inject(BackendClientService);
  protected readonly toastr = inject(ToastrService);

  protected insertionData: InsertionRequestDTO | null = null;

  protected insertionForRentForm = new FormGroup({
    rent: new FormControl<number>(0)
  });

  protected patchInsertionData(insertionData: InsertionRequestDTO) {
    this.insertionData = insertionData;
  }

  protected onSubmit() {
    if (!this.insertionData || !this.insertionForRentForm.valid) return;

    const insertionForRent: InsertionForRentRequestDTO = {
      ...this.insertionData,
      rent: this.insertionForRentForm.get('rent')?.value || 0
    };

    console.log("Submitting insertion:\n", insertionForRent);

    this.client.postInsertionForRent(insertionForRent).subscribe({
      next: (response) => {
        console.log('Insertion uploaded successfully:', response);
        this.toastr.success('Insertion uploaded successfully', 'Success');
      },
      error: (error) => {
        console.error('Error uploading insertion:', error);
        this.toastr.error('Error uploading insertion', 'Error');
      }
    });
  }

}
