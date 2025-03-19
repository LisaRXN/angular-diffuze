import { map, Observable } from 'rxjs';
import { Property } from '../../models/property.model';
import { PropertyGateway } from '../../ports/property.gateway';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FetchPropertiesResponse {
  properties: Property[];
  message: string;
  count: number;
}

export class HttpPropertyGateway extends PropertyGateway {
  http = inject(HttpClient);

  override fetchLastProperties(): Observable<Property[]> {
    return this.http
      .get<FetchPropertiesResponse>(
        'https://data.barnabe-immo.fr/api/properties/latest/3'
      )
      .pipe(map((response) => response.properties));
  }

  override fetchProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('/');
  }
}
