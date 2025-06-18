import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
})
export class FooterComponent {
  // This makes the current year available to the template automatically.
  public currentYear = new Date().getFullYear();
}
