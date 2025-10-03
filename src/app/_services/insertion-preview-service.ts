import { inject, Injectable } from '@angular/core';
import { InsertionResponseDTO } from '../_types/insertions/InsertionResponseDTO';
import { UserStateService } from './user-state-service';
import { Address } from '../_types/Address';
import { InsertionForSaleResponseDTO } from '../_types/insertions/InsertionForSaleResponseDTO';
import { InsertionForRentResponseDTO } from '../_types/insertions/InsertionForRentResponseDTO';
import { InsertionViewModal } from '../_components/insertion-view-modal/insertion-view-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsertionRequestDTO } from '../_types/insertions/InsertionRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class InsertionPreviewService {
  private userService = inject(UserStateService);
  private modalService = inject(NgbModal);

  public openPreviewModal(insertionReq: InsertionRequestDTO) {
    const modalRef = this.modalService.open(InsertionViewModal);
    modalRef.componentInstance.isConfirmationModal = true;
    modalRef.componentInstance.insertion = this.convertToPreview(insertionReq);
    return modalRef.result;
  }

  public convertToPreview(insertionData: InsertionRequestDTO) {
    var conversion = {
      id: 0,
      description: insertionData.description,
      tags: insertionData.tags,
      address: this.convertFeatureCollectionToAddress(insertionData.address),
      uploader: this.userService.user()!,
      agency: this.userService.agency()!,
      size: insertionData.size,
      numberOfRooms: insertionData.numberOfRooms,
      floor: insertionData.floor,
      hasElevator: insertionData.hasElevator,
    };

    if ('price' in insertionData) {
      (conversion as any).price = insertionData.price;
      return conversion as InsertionForSaleResponseDTO;
    }
    if ('rent' in insertionData) {
      (conversion as any).rent = insertionData.rent;
      return conversion as InsertionForRentResponseDTO;
    }

    return conversion as InsertionResponseDTO;
  }

  private convertFeatureCollectionToAddress(featureCollection: any): Address {
    const firstFeature = featureCollection.features[0];
    return {
      location: firstFeature.geometry,
      formatted: firstFeature.properties.formatted,
    };
  }
}
