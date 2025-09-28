import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tags-field',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './tags-field.html',
  styleUrl: './tags-field.scss'
})
export class TagsField {
  @Output() tags = new EventEmitter<string[]>();

  protected readonly announcer = inject(LiveAnnouncer);
  protected readonly reactiveKeywords = signal<string[]>([]);

  constructor() {
    effect(() => {
      const keywords = this.reactiveKeywords();
      this.tags.emit(keywords);
    });
  }

  protected addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    event.chipInput!.clear();
  }

  protected removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }
}
