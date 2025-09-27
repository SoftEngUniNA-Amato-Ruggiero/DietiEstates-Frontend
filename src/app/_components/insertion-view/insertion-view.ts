import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from "ngx-quill";
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';

@Component({
  selector: 'app-insertion-view',
  imports: [QuillModule, MatChipsModule],
  templateUrl: './insertion-view.html',
  styleUrl: './insertion-view.scss'
})
export class InsertionView {
  @Input() insertion!: InsertionResponseDTO;
}
