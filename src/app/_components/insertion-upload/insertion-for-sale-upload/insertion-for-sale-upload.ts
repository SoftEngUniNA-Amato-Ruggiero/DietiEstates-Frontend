import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InsertionUpload } from "../base-insertion-upload/insertion-upload";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InsertionForSaleRequestDTO } from '../../../_types/insertions/InsertionForSaleRequestDTO';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';
import { BackendClientService } from '../../../_services/backend-client-service';
import { ToastrService } from 'ngx-toastr';
import { InsertionPreviewService } from '../../../_services/insertion-preview-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertion-for-sale-upload',
  imports: [InsertionUpload, ReactiveFormsModule],
  templateUrl: './insertion-for-sale-upload.html',
  styleUrl: './insertion-for-sale-upload.scss'
})
export class InsertionForSaleUpload {
  @Output() mapReady = new EventEmitter<L.Map>();

  protected readonly client = inject(BackendClientService);
  protected readonly previewService = inject(InsertionPreviewService);
  protected readonly toastr = inject(ToastrService);
  protected readonly router = inject(Router);

  protected map: L.Map | null = null;
  protected insertionData: InsertionRequestDTO | null = null;

  protected insertionForSaleForm = new FormGroup({
    price: new FormControl<number>(0)
  });

  protected patchInsertionData(insertionData: InsertionRequestDTO) {
    this.insertionData = insertionData;
  }

  protected openConfirmationModal() {
    if (!this.insertionData || !this.insertionForSaleForm.valid || !this.insertionForSaleForm.get('price')?.value) return;

    const insertionForSale: InsertionForSaleRequestDTO = {
      ...this.insertionData,
      price: this.insertionForSaleForm.get('price')?.value || 0
    };

    this.previewService.openPreviewModal(insertionForSale).then(
      (result) => {
        console.log('Modal closed with result:', result);
        this.onSubmit(insertionForSale);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  protected onSubmit(insertionForSale: InsertionForSaleRequestDTO) {
    console.log("Submitting insertion:\n", insertionForSale);

    this.client.postInsertionForSale(insertionForSale).subscribe({
      next: (response) => {
        console.log('Insertion uploaded successfully:', response);
        this.toastr.success('Insertion uploaded successfully', 'Success');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error uploading insertion:', error);
        this.toastr.error('Error uploading insertion', 'Error');
      }
    });
  }
}
