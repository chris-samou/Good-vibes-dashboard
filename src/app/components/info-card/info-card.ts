import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.html',
})
export class InfoCardComponent implements AfterViewInit {
  // @Input() allows parent components to pass data into this component.
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() isLoading: boolean = true;
  @Input() error: boolean = false;

  // This is the new way to get a reference to an element in the template.
  cardElement = viewChild<ElementRef>('card');
  ngAfterViewInit(): void {
    gsap.from(this.cardElement()?.nativeElement, {
      duration: 0.8,
      opacity: 1,
      y: 50,
      ease: 'power3.out',
      delay: 0.2, // A small delay to make the animations stagger nicely
    });
  }
}
