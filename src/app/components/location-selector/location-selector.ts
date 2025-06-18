import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './location-selector.html',
})
export class LocationSelectorComponent implements OnInit {
  @Input() initialCity: string = '';

  city: string = '';

  @Output() locationSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.city = this.initialCity;
  }

  search(): void {
    if (this.city.trim()) {
      this.locationSelected.emit(this.city.trim());
    }
  }
}
