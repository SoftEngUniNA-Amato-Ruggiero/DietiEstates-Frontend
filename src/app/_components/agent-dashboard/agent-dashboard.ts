import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserStateService } from '../../_services/user-state-service';
import { InsertionForSaleUpload } from "../insertion-upload/insertion-for-sale-upload/insertion-for-sale-upload";
import { InsertionForRentUpload } from "../insertion-upload/insertion-for-rent-upload/insertion-for-rent-upload";
import { AgencyInfo } from "../agency-info/agency-info";

@Component({
  selector: 'app-agent-dashboard',
  imports: [InsertionForSaleUpload, InsertionForRentUpload, NgbNavModule, AgencyInfo],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.scss'
})
export class AgentDashboard {
  @ViewChild(InsertionForSaleUpload) saleUpload?: InsertionForSaleUpload;
  @ViewChild(InsertionForRentUpload) rentUpload?: InsertionForRentUpload;


  readonly userStateService = inject(UserStateService);
  active = 1;

  private tabChangeSignal = signal(0);
  private mapSignal = signal<L.Map | null>(null);

  constructor() {
    effect(() => {
      const tabId = this.tabChangeSignal();
      const map = this.mapSignal();
      if (!map || tabId === 0) {
        return;
      }
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    });
  }

  protected onTabChange(tabId: number) {
    this.tabChangeSignal.set(tabId);
  }

  protected onMapReady(map: L.Map) {
    this.mapSignal.set(map);
  }
}
