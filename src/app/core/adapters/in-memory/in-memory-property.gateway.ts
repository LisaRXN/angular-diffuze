import { PropertyGateway } from '../../ports/property.gateway';
import { Property } from '../../models/property.model';
import { Observable, of, take } from 'rxjs';
import { Ad } from '../../models/ad.models';

export class InMemoryPropertyGateway extends PropertyGateway {
  

  private properties: Property[] = [
    {
      id: 1,
      image: 'assets/img/photo/property.png',
      property_type: 'Appartement',
      addressForm: {
        city: 'Paris',
        street_adress: 'Rue Martel',
        longitude: 0,
        latitude: 0,
      },
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: '465000',
    },
    {
      id: 2,
      image: 'assets/img/photo/property.png',
      property_type: 'Appartement',
      addressForm: {
        city: 'Paris',
        street_adress: 'Rue Martel',
        longitude: 0,
        latitude: 0,
      },
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: '465000',
    },
    {
      id: 3,
      image: 'assets/img/photo/property.png',
      property_type: 'Appartement',
      addressForm: {
        city: 'Paris',
        street_adress: 'Rue Martel',
        longitude: 0,
        latitude: 0,
      },
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: '465000',
    },
    {
      id: 4,
      image: 'assets/img/photo/property.png',
      property_type: 'Appartement',
      addressForm: {
        city: 'Paris',
        street_adress: 'Rue Martel',
        longitude: 0,
        latitude: 0,
      },
      living_space: 40,
      room: 2,
      floor: 2,
      selling_price: '465000',
    },
  ];

  override fetchLastProperties(): Observable<Property[]> {
    const lastProperties = this.properties.slice(0, 3);
    return of(lastProperties);
  }

  override getPaidAds(): Observable<Ad[]> {
    return of([]);
  }
}
