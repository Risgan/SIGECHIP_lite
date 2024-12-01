import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengModule } from './shared/primeng/primeng.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimengModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SigechipFront';
}
