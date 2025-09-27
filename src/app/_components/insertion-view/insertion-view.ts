import { Component, Input } from '@angular/core';
import { InsertionResponseDTO } from '../../_types/insertions/InsertionResponseDTO';
import { JsonPipe } from '@angular/common';
import { QuillModule } from "ngx-quill";
@Component({
  selector: 'app-insertion-view',
  imports: [JsonPipe, QuillModule],
  templateUrl: './insertion-view.html',
  styleUrl: './insertion-view.scss'
})
export class InsertionView {
  @Input() insertion!: InsertionResponseDTO;
}
