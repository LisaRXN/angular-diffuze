import { map, Observable, of } from 'rxjs';
import { AlertGateway } from '../../ports/alert.gateway';
import { alertDetails } from '../../models/alert.models';

export class InMemoryAlertGateway extends AlertGateway {

  override createAlert(alertDetails: alertDetails): Observable<any> {
    console.log(alertDetails)
    const message ='alert send'
    return of(message)
  }
}
