import { FetchAdResponse, PropertyGateway } from '../../ports/property.gateway';
import { Property } from '../../models/property.model';
import { Observable, of, take } from 'rxjs';
import { ContactDetails } from '../../models/contactDetails';

export class InMemoryPropertyGateway extends PropertyGateway {
  

  override fetchLastProperties(): Observable<Property[]> {
    return of([]);
  }

  override fetchFilteredProperties(filters: any): Observable<FetchAdResponse> {
    return of()
  }

  override fetchPropertyById(propertyId: string): Observable<Property> {
    return of()
  }

  override sendPropertyInquiry(contactDetails: ContactDetails){
    console.log('Contcat message send', contactDetails)
    return of()
  }

}
