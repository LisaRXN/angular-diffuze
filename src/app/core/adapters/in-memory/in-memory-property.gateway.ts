import { FetchAdResponse, PropertyGateway } from '../../ports/property.gateway';
import { Property } from '../../models/property.model';
import { Observable, of, take } from 'rxjs';

export class InMemoryPropertyGateway extends PropertyGateway {
  

  override fetchLastProperties(): Observable<Property[]> {
    return of([]);
  }

  override fetchFilteredProperties(filters: any): Observable<FetchAdResponse> {
    return of()
  }

}
