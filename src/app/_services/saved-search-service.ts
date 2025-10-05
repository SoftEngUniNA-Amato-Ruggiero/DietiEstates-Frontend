import { Injectable, signal } from '@angular/core';
import { Page } from '../_types/page';
import { InsertionSearchResultDTO } from '../_types/insertions/InsertionSearchResultDTO';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  public savedSearchResults = signal<Page<InsertionSearchResultDTO> | undefined>(undefined);
}
