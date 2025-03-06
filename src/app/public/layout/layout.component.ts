import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieConsentComponent } from '../../shared/components/cookie-consent/cookie-consent.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    CookieConsentComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

  @ViewChild('drawerCheckbox') drawerCheckbox!: ElementRef;

  closeDrawer() {
    if (this.drawerCheckbox) {
      this.drawerCheckbox.nativeElement.checked = false;
    }
  }



}
