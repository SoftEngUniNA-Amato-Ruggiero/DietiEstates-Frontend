import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InsertionForSaleResponseDTO } from '../../../_types/insertions/InsertionForSaleResponseDTO';

@Component({
  selector: 'app-insertion-for-sale-rows',
  imports: [CurrencyPipe],
  templateUrl: './insertion-for-sale-rows.html',
  styleUrl: './insertion-for-sale-rows.scss'
})
export class InsertionForSaleRows {
  @Input() insertion!: InsertionForSaleResponseDTO;
}
