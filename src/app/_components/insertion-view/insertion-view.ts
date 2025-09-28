import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from "ngx-quill";
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { InsertionForSaleRows } from "./insertion-for-sale-rows/insertion-for-sale-rows";
import { InsertionForSaleResponseDTO } from '../../_types/insertions/InsertionForSaleResponseDTO';
import { InsertionForRentResponseDTO } from '../../_types/insertions/InsertionForRentResponseDTO';
import { InsertionForRentRows } from "./insertion-for-rent-rows/insertion-for-rent-rows";

@Component({
  selector: 'app-insertion-view',
  imports: [
    QuillModule,
    MatChipsModule,
    NgbAccordionModule,
    InsertionForSaleRows,
    InsertionForRentRows
  ],
  templateUrl: './insertion-view.html',
  styleUrl: './insertion-view.scss'
})
export class InsertionView {
  @Input() insertion!: InsertionResponseDTO;

  protected get downcastForSale() {
    return this.insertion as InsertionForSaleResponseDTO;
  }
  protected get downcastForRent() {
    return this.insertion as InsertionForRentResponseDTO;
  }
}
