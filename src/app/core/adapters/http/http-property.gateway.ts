import { catchError, map, Observable, of } from 'rxjs';
import { Property } from '../../models/property.model';
import {
  FetchAdResponse,
  FetchPropertiesResponse,
  PropertyGateway,
} from '../../ports/property.gateway';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactDetails } from '../../models/contactDetails';

export class HttpPropertyGateway extends PropertyGateway {
  http = inject(HttpClient);

  override fetchLastProperties(): Observable<Property[]> {
    return this.http
      .get<FetchPropertiesResponse>(
        'https://data.barnabe-immo.fr/api/properties/latest/3'
      )
      .pipe(map((response) => response.properties));
  }

  override fetchFilteredProperties(filters: any): Observable<FetchAdResponse> {
    let params = new URLSearchParams();

    params.set('limit', '20');
    if (filters.page) params.set('page', filters.page);
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.transactionType)
      params.set('transactionType', filters.transactionType);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minSurface) params.set('minSurface', filters.minSurface);
    if (filters.maxSurface) params.set('maxSurface', filters.maxSurface);
    if (filters.localization?.length > 0)
      params.set('localization', filters.localization.join(','));

    return this.http.get<FetchAdResponse>(
      `https://data.barnabe-immo.fr/api/properties/getAll?${params.toString()}`
    );
  }

  override fetchPropertyById(propertyId: string): Observable<Property | null> {
    console.log('fetchPropertyById called with:', propertyId);
    return this.http.get<Property>(
      `https://data.barnabe-immo.fr/api/properties/id/${propertyId}`
    ).pipe(
      catchError(err => {
        console.error('Erreur API:', err);
        return of(null); 
      })
    )
  }

  override sendPropertyInquiry(contactDetails: ContactDetails): Observable<any> {
    console.log('message send', contactDetails);
    return this.http.post('https://data.barnabe-immo.fr/api/contact-agent/send', contactDetails);
  }
}
