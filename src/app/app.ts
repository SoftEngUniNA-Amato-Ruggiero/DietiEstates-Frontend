import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_components/navbar/navbar';
import { backend } from './_config/backend.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  swaggerUrl = `${backend.domain}:${backend.port}/api/swagger-ui/index.html`;
  githubUrl = 'https://github.com/SoftEngUniNA-Amato-Ruggiero';
}
