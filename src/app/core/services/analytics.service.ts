import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

declare const gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private gaId = 'G-7GQN9G60FD';
  private isInitialized = false;
  private consentGranted = false;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialiser GA uniquement en production et dans un navigateur
    if (environment.production && this.isBrowser) {
      this.initializeGoogleAnalytics();
    }
  }

  private initializeGoogleAnalytics() {
    try {
      if (!this.isBrowser) return;

      // Ajouter le script GA
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      document.head.appendChild(script1);

      // Configuration initiale
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        // Désactiver par défaut jusqu'au consentement
        gtag('config', '${this.gaId}', {
          'anonymize_ip': true,
          'send_page_view': false
        });
      `;
      document.head.appendChild(script2);

      // Attendre que le script soit chargé
      script1.onload = () => {
        this.isInitialized = true;
        this.setupRouteTracking();
      };
    } catch (e) {
      console.error("Erreur lors de l'initialisation de Google Analytics", e);
    }
  }

  private setupRouteTracking() {
    if (!this.isInitialized) return;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (this.consentGranted) {
          gtag('config', this.gaId, {
            page_path: event.urlAfterRedirects,
            page_title: document.title,
          });
        }
      });
  }

  // Gestion du consentement RGPD
  public setConsent(granted: boolean) {
    this.consentGranted = granted;

    if (!this.isInitialized) return;

    if (granted) {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
      });

      // Envoyer la page actuelle après consentement
      gtag('config', this.gaId, {
        page_path: this.router.url,
        page_title: document.title,
      });
    } else {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  }

  // Suivi d'événements
  public trackEvent(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string | null = null,
    eventValue: number | null = null
  ) {
    if (!this.isInitialized || !this.consentGranted) return;

    gtag('event', eventName, {
      event_category: eventCategory,
      event_action: eventAction,
      event_label: eventLabel,
      value: eventValue,
    });
  }

  // Suivi des utilisateurs connectés
  public setUserProperties(userId: string, properties: any) {
    if (!this.isInitialized || !this.consentGranted) return;

    gtag('set', 'user_properties', properties);
    gtag('set', { user_id: userId });
  }

  // Suivi des temps de chargement
  public trackTiming(
    category: string,
    variable: string,
    value: number,
    label?: string
  ) {
    if (!this.isInitialized || !this.consentGranted) return;

    gtag('event', 'timing_complete', {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }

  // Mode debug (à utiliser uniquement en développement)
  public enableDebugMode() {
    if (!this.isInitialized) return;

    gtag('config', this.gaId, { debug_mode: true });
  }
}
