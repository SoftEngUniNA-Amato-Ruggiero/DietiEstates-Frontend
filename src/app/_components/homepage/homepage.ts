import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AdvancedSearch } from "../advanced-search/advanced-search";
import { SavedSearches } from "../saved-searches/saved-searches";
import { InsertionSearchResultDTO } from '../../_types/insertions/InsertionSearchResultDTO';
import { Page } from '../../_types/page';
import { SavedSearchService } from '../../_services/saved-search-service';

@Component({
  selector: 'app-homepage',
  imports: [
    AgencyUpload,
    AdvancedSearch,
    SavedSearches
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  readonly authService = inject(AuthService);
  readonly userStateService = inject(UserStateService);
  readonly savedSearchService = inject(SavedSearchService);
  protected onSavedSearchResults(res: Page<InsertionSearchResultDTO>) {
    this.savedSearchService.savedSearchResults.set(res);
  }
}
