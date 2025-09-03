import { Component, inject } from '@angular/core';
import { MapComponent } from '../map-component/map-component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendClientService } from '../../_services/backend-client-service';

@Component({
  selector: 'app-insertion-upload',
  imports: [MapComponent, ReactiveFormsModule],
  templateUrl: './insertion-upload.html',
  styleUrl: './insertion-upload.scss'
})
export class InsertionUpload {
  protected client = inject(BackendClientService);

  protected insertionForm = new FormGroup({
    address: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    location: new FormControl('')
  });

  protected onSubmit() {
    if (this.insertionForm.valid) {
      this.client.postInsertionForSale(this.insertionForm.value).subscribe({
        next: (response) => {
          console.log('Insertion uploaded successfully:', response);
        },
        error: (error) => {
          console.error('Error uploading insertion:', error);
        }
      });
    }
  }

}
