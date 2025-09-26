import { Component, inject } from '@angular/core';
import { InsertionUpload } from "../base-insertion-upload/insertion-upload";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InsertionForSaleRequestDTO } from '../../../_types/insertions/InsertionForSaleRequestDTO';
import { InsertionRequestDTO } from '../../../_types/insertions/InsertionRequestDTO';
import { BackendClientService } from '../../../_services/backend-client-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insertion-for-sale-upload',
  imports: [InsertionUpload, ReactiveFormsModule],
  templateUrl: './insertion-for-sale-upload.html',
  styleUrl: './insertion-for-sale-upload.scss'
})
export class InsertionForSaleUpload {
  protected readonly client = inject(BackendClientService);
  protected readonly toastr = inject(ToastrService);

  protected insertionData: InsertionRequestDTO | null = null;

  protected insertionForSaleForm = new FormGroup({
    price: new FormControl<number>(0)
  });

  protected patchInsertionData(insertionData: InsertionRequestDTO) {
    this.insertionData = insertionData;
  }

  protected onSubmit() {
    if (!this.insertionData || !this.insertionForSaleForm.valid) return;

    const insertionForSale: InsertionForSaleRequestDTO = {
      ...this.insertionData,
      price: this.insertionForSaleForm.get('price')?.value || 0
    };

    console.log("Submitting insertion:\n", insertionForSale);

    this.client.postInsertionForSale(insertionForSale).subscribe({
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
