import { Component, inject } from '@angular/core';
import { UserServiceClient } from '../_services/clients/user-service-client';
import { RealEstateAgent } from '../_model/realEstateAgent';
import { UserInfo } from '../_model/user-info';
import { Agency } from '../_model/agency';
import { AuthService } from '../_services/auth-service';

@Component({
  selector: 'app-test-buttons',
  imports: [],
  templateUrl: './test-buttons.html',
  styleUrl: './test-buttons.scss'
})
export class TestButtons {
  private readonly userServiceClient = inject(UserServiceClient);
  private readonly authService = inject(AuthService);

  protected postAgency() {
    const agency = new Agency(
      'iban',
      'name'
    );

    this.userServiceClient.postAgency(agency).subscribe(response => {
      console.log('Agency created:', response);
      this.authService.roleSignal.set(response.role);
    });
  }

  protected putAgency(agencyId: number) {
    const agency = new Agency(
      'iban',
      'new-name'
    );

    this.userServiceClient.putAgency(agencyId, agency).subscribe(response => {
      console.log('Agency updated:', response);
    });
  }

  protected postAgent() {
    this.userServiceClient.postAgent(1, 'giuseppe.mta97@gmail.com').subscribe(response => {
      console.log('Agent created:', response);
    });
  }

  protected getUserByEmail(email: string) {
    this.userServiceClient.getUserByEmail(email).subscribe(user => {
      console.log('User found:', user);
    });
  }

  protected getAgencies() {
    this.userServiceClient.getAgencies().subscribe(agencies => {
      console.log('All agencies:', agencies);
    });
  }

}
