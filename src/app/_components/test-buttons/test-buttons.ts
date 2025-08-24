import { Component, inject } from '@angular/core';
import { UserServiceClient } from '../../_services/clients/user-service-client';
import { Agency } from '../../_dto/agency';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'app-test-buttons',
  imports: [],
  templateUrl: './test-buttons.html',
  styleUrl: './test-buttons.scss'
})
export class TestButtons {
  private readonly userServiceClient = inject(UserServiceClient);
  private readonly authService = inject(AuthService);

  // protected putAgency(agencyId: number) {
  //   const agency = new Agency(
  //     'iban',
  //     'new-name'
  //   );

  //   this.userServiceClient.putAgency(agencyId, agency).subscribe(response => {
  //     console.log('Agency updated:', response);
  //   });
  // }

  protected getUserByEmail(email: string) {
    this.userServiceClient.getUserByUsername(email).subscribe(user => {
      console.log('User found:', user);
    });
  }

  protected getAgencies() {
    this.userServiceClient.getAgencies().subscribe(agencies => {
      console.log('All agencies:', agencies);
    });
  }

}
