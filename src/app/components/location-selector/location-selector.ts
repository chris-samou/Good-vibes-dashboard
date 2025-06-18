import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-selector.html',
})
export class LocationSelectorComponent {
  @Output() locationSelected = new EventEmitter<string>();

  city: string = 'London'; // Default city

  search(): void {
    console.log('Search button clicked! City is:', this.city);
    if (this.city.trim()) {
      this.locationSelected.emit(this.city.trim());
    }
  }
}
