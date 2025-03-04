import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics.service';

@Component({
  selector: 'app-cookie-consent',
  template: `
    @if(!consentGiven){
    <div class="cookie-banner">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site.
      </p>
      <div class="buttons">
        <button (click)="acceptCookies()">Accepter</button>
        <button (click)="rejectCookies()">Refuser</button>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f1f1f1;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
      }
      .buttons {
        display: flex;
        gap: 1rem;
      }
      button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class CookieConsentComponent implements OnInit {
  consentGiven = false;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Vérifier si le consentement a déjà été donné
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('diffuze-cookie-consent');
      if (consent) {
        this.consentGiven = consent === 'true';
        this.analyticsService.setConsent(this.consentGiven);
      }
    }
  }

  acceptCookies() {
    this.consentGiven = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('diffuze-cookie-consent', 'true');
    }
    this.analyticsService.setConsent(true);
  }

  rejectCookies() {
    this.consentGiven = true; // Pour masquer la bannière
    if (typeof window !== 'undefined') {
      localStorage.setItem('diffuze-cookie-consent', 'false');
    }
    this.analyticsService.setConsent(false);
  }
}
