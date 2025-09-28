import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InsertionForRentResponseDTO } from '../../../_types/insertions/InsertionForRentResponseDTO';

@Component({
  selector: 'app-insertion-for-rent-rows',
  imports: [CurrencyPipe],
  templateUrl: './insertion-for-rent-rows.html',
  styleUrl: './insertion-for-rent-rows.scss'
})
export class InsertionForRentRows {
  @Input() insertion!: InsertionForRentResponseDTO;
}
