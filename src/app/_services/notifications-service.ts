import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth-service';
import { UserStateService } from './user-state-service';
import { InsertionSearchResultDTO } from '../_types/insertions/InsertionSearchResultDTO';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly toastr = inject(ToastrService);
  private readonly authService = inject(AuthService);
  private readonly userStateService = inject(UserStateService);

  private evtSource: EventSource | null = null;

  constructor() {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.evtSource = new EventSource("http://localhost:3000/", {
      withCredentials: true,
    });

    this.evtSource.onmessage = (event) => {
      const userCity = this.userStateService.notificationsPreferences()?.city;
      if (!userCity) {
        console.warn("City is not set yet");
        return;
      }

      console.debug("Event:", event);
      const data = event.data;
      if (!data) {
        return;
      }

      try {
        const parsedData = JSON.parse(data);
        console.debug("Data:", parsedData);

        const body = JSON.parse(parsedData.Body);
        console.debug("Body:", body);

        const attributes: { city: { Value: string }, type: { Value: string } } = body.MessageAttributes;
        console.debug("Attributes:", attributes);

        if (attributes.city.Value !== userCity) {
          return;
        }
        if (!this.userStateService.notificationsPreferences()?.notificationsForRentEnabled
          && attributes.type.Value === "InsertionForRent") {
          return;
        }
        if (!this.userStateService.notificationsPreferences()?.notificationsForSaleEnabled
          && attributes.type.Value === "InsertionForSale") {
          return;
        }

        const message: InsertionSearchResultDTO = JSON.parse(body.Message);

        this.toastr.info(`New insertion with id ${message.id} at ${message.location}`, "New message:", {
          disableTimeOut: true,
          closeButton: true,
        });

      } catch (e) {
        console.error("Failed to parse notification message:\n", data, e);
      }
    }
  }
}
