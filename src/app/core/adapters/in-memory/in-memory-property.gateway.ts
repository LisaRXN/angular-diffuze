import { PropertyGateway } from '../../ports/property.gateway';
import { Property } from '../../models/property.model';
import { Observable, of } from 'rxjs';

export class InMemoryPropertyGateway extends PropertyGateway {

    private properties: Property[] = [
        {
          id: 1,
          image: "assets/img/photo/property.png",
          property_type: "Appartement",
          city: "Paris",
          street: "Rue Martel",
          living_space: 40,
          room: 2,
          floor: 2,
          selling_price: 465000
        },
        {
          id: 2,
          image: "assets/img/photo/property.png",
          property_type: "Appartement",
          city: "Paris",
          street: "Rue Martel",
          living_space: 40,
          room: 2,
          floor: 2,
          selling_price: 465000
        },
        {
          id: 3,
          image: "assets/img/photo/property.png",
          property_type: "Appartement",
          city: "Paris",
          street: "Rue Martel",
          living_space: 40,
          room: 2,
          floor: 2,
          selling_price: 465000
        }
      ]

      override fetchProperties(): Observable<Property[]> {
        return of(this.properties)
      }

      override fetchLastProperties(): Observable<Property[]> {
        return of(this.properties)
      }

}