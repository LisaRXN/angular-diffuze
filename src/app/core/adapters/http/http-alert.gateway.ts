import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertGateway } from '../../ports/alert.gateway';
import { alertFilters } from '../../models/ad.models';
import { environment } from '../../../../environments/environment';

export class HttpAlertGateway extends AlertGateway {
  http = inject(HttpClient);

  override createAlert(filters:alertFilters): Observable<any> {
    return this.http.post(environment.apiURL + `/alertes/`, filters, {
      observe: 'response',
    }) 
  }
}
