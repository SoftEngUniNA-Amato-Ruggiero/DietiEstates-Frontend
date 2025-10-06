import { Injectable, signal } from '@angular/core';
import { Page } from '../_types/page';
import { InsertionSearchResultDTO } from '../_types/insertions/InsertionSearchResultDTO';
import { SavedSearch } from '../_types/searches/SavedSearch';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  public selectedSavedSearch = signal<SavedSearch | null>(null);
  public savedSearchResults = signal<Page<InsertionSearchResultDTO> | undefined>(undefined);
  public reloadSavedSearches = signal(false);
}
