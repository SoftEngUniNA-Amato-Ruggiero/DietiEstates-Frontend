import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly toastr = inject(ToastrService);

  private readonly evtSource = new EventSource("http://localhost:3000/", {
    withCredentials: true,
  });

  constructor() {
    this.evtSource.onmessage = (event) => {
      this.toastr.info(event.data, "New message:", {
        timeOut: 10000,
        progressBar: true,
        closeButton: true,
      });
      console.log("New notification received:", event.data);
    };
  }
}
