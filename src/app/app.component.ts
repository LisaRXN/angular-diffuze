import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { SEO_CONFIG } from './core/services/seo.config';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'diffuze';
  constructor(
    private seoService: SeoService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Trouver la configuration SEO correspondante à la route actuelle
        const currentRoute = event.urlAfterRedirects;
        const seoConfig = SEO_CONFIG[currentRoute] || SEO_CONFIG['/'];

        // Appliquer la configuration SEO
        this.seoService.updateSeoTags(seoConfig);
      });
  }
}
