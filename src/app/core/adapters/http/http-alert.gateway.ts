import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertGateway } from '../../ports/alert.gateway';
import { environment } from '../../../../environments/environment.prod';
import { alertDetails } from '../../models/alert.models';

export class HttpAlertGateway extends AlertGateway {
  http = inject(HttpClient);

  override createAlert(alertDetails:alertDetails): Observable<any> {
    return this.http.post(environment.apiURL + `/alertes/`, alertDetails, {
      observe: 'response',
    }) 
  }
}
