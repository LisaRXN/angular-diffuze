import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink],
  template: `
    @if(!consentGiven){
    <div class="cookie-banner">
      <div class="flex flex-col md:flex-row gap-2 flex-1 justify-between">
        <div class="flex items-center justify-start gap-4 ">
          <img
            src="assets/img/icon/cookies.png"
            class="z-10 w-[40px] h-auto"
            alt=""
          />
          <p class="text-slate-500 text-justify">
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            site. 
            <span routerLink="/protection-des-donnees" class="text-slate-500 text-sm underline cursor-pointer ml-1">En savoir plus</span>
          </p>
        </div>
        <div class="buttons flex-col md:flex-row">
          <button
            (click)="acceptCookies()"
            class="w-full md:w-auto text-mygrey2 bg-myyellow1 hover:bg-myyellow2 px-4 py-3 rounded-xl transition duration-300"
          >
            Accepter
          </button>
          <button
            (click)="rejectCookies()"
            class="w-full md:w-auto text-mygrey2 hover:bg-mygrey4 px-4 py-3 rounded-xl  transition duration-300"
          >
            Refuser
          </button>
        </div>
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
    // Utiliser setTimeout pour déplacer la vérification après le cycle de détection des changements
    setTimeout(() => {
      // Vérifier si le consentement a déjà été donné
      if (typeof window !== 'undefined') {
        const consent = localStorage.getItem('diffuze-cookie-consent');
        if (consent) {
          this.consentGiven = consent === 'true';
          this.analyticsService.setConsent(this.consentGiven);
        }
      }
    }, 0);
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
