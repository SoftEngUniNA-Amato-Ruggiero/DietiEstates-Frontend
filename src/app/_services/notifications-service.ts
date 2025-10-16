import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly evtSource = new EventSource("//api.example.com/sse-demo.php", {
    withCredentials: true,
  });

  constructor() {
    this.evtSource.onmessage = (event) => {
      console.log("New message:", event.data);
    };
  }
}
