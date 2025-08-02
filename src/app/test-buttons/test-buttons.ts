import { Component, inject } from '@angular/core';
import { UserServiceClient } from '../_services/clients/user-service-client';
import { RealEstateAgent } from '../_model/realEstateAgent';
import { Credentials } from '../_model/credentials';
import { UserInfo } from '../_model/user-info';
import { Agency } from '../_model/agency';

@Component({
  selector: 'app-test-buttons',
  imports: [],
  templateUrl: './test-buttons.html',
  styleUrl: './test-buttons.scss'
})
export class TestButtons {
  private readonly userServiceClient = inject(UserServiceClient);

  protected postAgency() {
    const agency = new Agency(
      'iban',
      'name'
    );

    this.userServiceClient.postAgency(agency).subscribe(response => {
      console.log('Agency created:', response);
    });
  }

  protected postManager() {
    const agent = new RealEstateAgent(
      new Credentials('manager@example.com', 'password'),
      new UserInfo('Manager', 'Zero'),
      1
    );

    this.userServiceClient.postManager(agent).subscribe(response => {
      console.log('Manager created:', response);
    });
  }

  protected postAgent() {
    const agent = new RealEstateAgent(
      new Credentials('agent1@example.com', 'password1'),
      new UserInfo('Agent', 'One'),
      1
    );

    this.userServiceClient.postAgent(agent).subscribe(response => {
      console.log('Agent created:', response);
    });
  }

  protected getUsers() {
    this.userServiceClient.getAllUsers().subscribe(users => {
      console.log('All users:', users);
    });
  }

  protected getUserByEmail(email: string) {
    this.userServiceClient.getUserByEmail(email).subscribe(users => {
      console.log('User found:', users[0]);
    });
  }

  protected getAgencies() {
    this.userServiceClient.getAgencies().subscribe(agencies => {
      console.log('All agencies:', agencies);
    });
  }

}
