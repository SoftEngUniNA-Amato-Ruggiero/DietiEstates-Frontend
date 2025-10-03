import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { InsertionView } from "../insertion-view/insertion-view";

@Component({
  selector: 'app-insertion-view-modal',
  imports: [InsertionView],
  templateUrl: './insertion-view-modal.html',
  styleUrl: './insertion-view-modal.scss'
})
export class InsertionViewModal {
  activeModal = inject(NgbActiveModal);

  @Input() insertion!: InsertionResponseDTO;
  @Output() closeModal = new EventEmitter<void>();
}
