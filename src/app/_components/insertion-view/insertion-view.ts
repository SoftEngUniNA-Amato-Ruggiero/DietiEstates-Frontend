import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from "ngx-quill";
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insertion-view',
  imports: [
    QuillModule,
    MatChipsModule,
    NgbAccordionModule
  ],
  templateUrl: './insertion-view.html',
  styleUrl: './insertion-view.scss'
})
export class InsertionView {
  @Input() insertion!: InsertionResponseDTO;
}
