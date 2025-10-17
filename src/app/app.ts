import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_components/navbar/navbar';
import { backend } from './_config/backend.config';
import { NotificationsService } from './_services/notifications-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  swaggerUrl = `${backend.domain}:${backend.port}/api/swagger-ui/index.html`;
  githubUrl = 'https://github.com/SoftEngUniNA-Amato-Ruggiero';

  private readonly notificationService = inject(NotificationsService);
}
