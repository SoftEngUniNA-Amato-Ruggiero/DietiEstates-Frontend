import { Component, effect, EventEmitter, inject, Output, SimpleChanges } from '@angular/core';
import { BackendClientService } from '../../_services/backend-client-service';
import { JsonPipe } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SavedSearch } from '../../_types/searches/SavedSearch';
import { SavedSearchForRent } from '../../_types/searches/SavedSearchForRent';
import { SavedSearchForSale } from '../../_types/searches/SavedSearchForSale';
import { InsertionSearchResultDTO } from '../../_types/insertions/InsertionSearchResultDTO';
import { Page } from '../../_types/page';
import { SavedSearchService } from '../../_services/saved-search-service';
import { GeoapifyClientService } from '../../_services/geoapify-client-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saved-searches',
  imports: [JsonPipe, NgbPaginationModule],
  templateUrl: './saved-searches.html',
  styleUrl: './saved-searches.scss'
})
export class SavedSearches {
  @Output() savedSearchResults = new EventEmitter<Page<InsertionSearchResultDTO>>();
  protected readonly client = inject(BackendClientService);
  protected readonly savedSearchService = inject(SavedSearchService);
  protected readonly toastr = inject(ToastrService);

  protected savedSearchesPages = new Array<SavedSearch>();
  protected pageNumber = 0;
  protected pageSize = 10;
  protected totalPages = 0;
  protected totalElements = 0;

  constructor() {
    this.getSavedSearchesPage(this.pageNumber, this.pageSize);

    effect(() => {
      if (this.savedSearchService.reloadSavedSearches()) {
        setTimeout(() => {
          this.getSavedSearchesPage(this.pageNumber - 1, this.pageSize)
        }, 200);
        this.savedSearchService.reloadSavedSearches.set(false);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateTrigger']) {
      this.getSavedSearchesPage(this.pageNumber, this.pageSize);
    }
  }

  executeSearch(search: SavedSearch) {
    this.savedSearchService.selectedSavedSearch.set(search);
    this.client.executeSavedSearch(search.id).subscribe({
      next: (response) => { this.savedSearchResults.emit(response); },
      error: (error) => { alert('Error executing search: ' + error.message) }
    });
  }

  deleteSearch(search: SavedSearch) {
    if (confirm(`Are you sure you want to delete the saved search "${search}"?`)) {
      this.client.deleteSavedSearch(search.id).subscribe({
        next: () => {
          this.toastr.success('Saved search deleted successfully.');
          this.getSavedSearchesPage(this.pageNumber - 1, this.pageSize);
        },
        error: (error) => {
          this.toastr.error('Error deleting saved search: ' + error.message);
        }
      });
    }
  }

  downCastForRent(search: SavedSearch) {
    return (search as SavedSearchForRent);
  }

  downCastForSale(search: SavedSearch) {
    return (search as SavedSearchForSale);
  }

  protected getSavedSearchesPage(pageNumber = 0, pageSize = 10) {
    this.client.getSavedSearches(pageNumber, pageSize).subscribe(
      (searches: Page<SavedSearch>) => {
        this.savedSearchesPages = searches.content ?? [];
        this.pageSize = searches.pageable?.pageSize ?? pageSize;
        this.totalPages = searches.totalPages ?? 0;
        this.totalElements = searches.totalElements ?? 0;
      }
    );
  }
}
