import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AdvancedSearch } from "../advanced-search/advanced-search";
import { SavedSearches } from "../saved-searches/saved-searches";
import { SavedSearch } from '../../_types/searches/SavedSearch';

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
  protected readonly savedSearch = signal<SavedSearch | null>(null);

  onSavedSearchSelected(search: SavedSearch) {
    this.savedSearch.set(search);
  }
}
