import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InsertionUpload } from "../base-insertion-upload/insertion-upload";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InsertionForRentRequestDTO } from '../../../_types/insertions/InsertionForRentRequestDTO';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';
import { BackendClientService } from '../../../_services/backend-client-service';
import { ToastrService } from 'ngx-toastr';
import { InsertionPreviewService } from '../../../_services/insertion-preview-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertion-for-rent-upload',
  imports: [InsertionUpload, ReactiveFormsModule],
  templateUrl: './insertion-for-rent-upload.html',
  styleUrl: './insertion-for-rent-upload.scss'
})
export class InsertionForRentUpload {
  @Output() mapReady = new EventEmitter<L.Map>()

  protected readonly client = inject(BackendClientService);
  protected readonly previewService = inject(InsertionPreviewService);
  protected readonly toastr = inject(ToastrService);
  protected readonly router = inject(Router);

  protected map: L.Map | null = null;
  protected insertionData: InsertionRequestDTO | null = null;

  protected insertionForRentForm = new FormGroup({
    rent: new FormControl<number>(0)
  });

  protected patchInsertionData(insertionData: InsertionRequestDTO) {
    this.insertionData = insertionData;
  }

  protected openConfirmationModal() {
    if (!this.insertionData || !this.insertionForRentForm.valid || !this.insertionForRentForm.get('rent')?.value) return;

    const insertionForRent: InsertionForRentRequestDTO = {
      ...this.insertionData,
      rent: this.insertionForRentForm.get('rent')?.value || 0
    };

    this.previewService.openPreviewModal(insertionForRent).then(
      (result) => {
        console.log('Modal closed with result:', result);
        this.onSubmit(insertionForRent);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  protected onSubmit(insertionForRent: InsertionForRentRequestDTO) {
    console.log("Submitting insertion:\n", insertionForRent);

    this.client.postInsertionForRent(insertionForRent).subscribe({
      next: (response) => {
        console.log('Insertion uploaded successfully:', response);
        this.toastr.success('Insertion uploaded successfully', 'Success');
        setTimeout(() => {
          // this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error uploading insertion:', error);
        this.toastr.error(error.error.message, 'Error uploading insertion:');
      }
    });
  }

}
