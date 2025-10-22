import { Component, effect, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { UserStateService } from '../../_services/user-state-service';
import { AgencyUpload } from '../agency-upload/agency-upload';
import { AdvancedSearch } from "../advanced-search/advanced-search";
import { SavedSearches } from "../saved-searches/saved-searches";
import { InsertionSearchResultDTO } from '../../_types/insertions/InsertionSearchResultDTO';
import { Page } from '../../_types/page';
import { SavedSearchService } from '../../_services/saved-search-service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  readonly modalService = inject(NgbModal);
  readonly toastr = inject(ToastrService);

  constructor() {
    effect(() => {
      if (this.userStateService.uploadAgencyResponseSignal()) {
        this.modalService.dismissAll();
        this.toastr.success('Agency uploaded successfully', 'Success');
      }
    });
  }

  protected closeResult: WritableSignal<string> = signal('');

  protected onSavedSearchResults(res: Page<InsertionSearchResultDTO>) {
    this.savedSearchService.savedSearchResults.set(res);
  }

  protected open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        // this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }
}
