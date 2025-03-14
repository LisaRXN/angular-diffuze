import { map, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertGateway } from '../../ports/alert.gateway';
import { alertFilters } from '../../models/ad.models';
import { environment } from '../../../../environments/environment';

export class InMemoryAlertGateway extends AlertGateway {

  override createAlert(filters: alertFilters): Observable<any> {
    console.log(filters)
    const message='alert send'
    return of(message)
  }
}
