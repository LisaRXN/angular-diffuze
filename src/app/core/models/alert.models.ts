export interface alertDetails {
  lastName: string;
  firstName: string;
  email: string;
  phone: number | null;
  reason: string;
  hasHouse: boolean;
  hasApartment: boolean;
  budgetMin: number | null;
  budgetMax: number | null;
  roomMin: number;
  bedroomMin: number;
  surfaceMin: number | null;
  surfaceMax: number | null;
  others: {
    hasElevator: boolean;
    hasBalcony: boolean;
    hasTerrace: boolean;
    hasParking: boolean;
    hasBox: boolean;
    hasBasement: boolean;
  };

  locations: string[];
}
