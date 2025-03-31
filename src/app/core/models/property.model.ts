interface DPE {
    CE: string;
    CEletter: string;
    CEmax: number;
    CEmin: number;
    DPEdate: string;
    EG: string;
    EGletter: string;
    has_DPE: boolean | null;
  }
  
  interface PROsettings {
    exclusive_mandate: number;
    fees: string;
    fees_price: string;
  }
  
  interface Address {
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    streetAutoComplete: string | null;
    street_address: string;
    zip_code: string;
  }
  
  export interface Advantages {
    has_balcony: boolean;
    has_box: boolean;
    has_calm?: boolean | null;
    has_cellar: boolean;
    has_crossing?: boolean | null;
    has_elevator: boolean;
    has_equipped?: boolean | null;
    has_exceptionalView?: boolean | null;
    has_furnished?: boolean | null;
    has_luminous?: boolean | null;
    has_noOppositeView?: boolean | null;
    has_openedKitchen?: boolean | null;
    has_parking: boolean;
    has_storage?: boolean | null;
    has_superIntendent?: boolean | null;
    has_terrace: boolean;
  }
  
  interface Contact {
    email: string;
    in_charge: number;
    specific_num: string;
  }

  interface Valuation {
      id: number;
      token: string;
      cityscan_id_address: string;
      low: number;
      mid: number;
      high: number;
  }
  
  interface Media {
    images: { 
        id:number,
        photo_path:string,
        name:string,
        pos:number
         }[];
    videoURL: string | null;
  }
  
  interface Settings {
    end_date: string;
    id_forfait: number;
    id_order: number;
    id_order_state: number;
    options: any[];
    type_id: number;
  }

  interface User {
    id: number,
    firstName: string,
    lastName: string,
    mail: string,
    phone: string,
    society:string
  }
  
  export interface Property {
    id: number;
    property_type: string;
    transaction_type: string;
    selling_price: string;
    rent_by_month: string;
    rental_expenses: string;
    living_space: number;
    land_area: number;
    total_floor: number;
    floor: number;
    bedroom: number;
    room: number;
    construction_period: string | null;
    general_condition: string | null;
    heating_type: string;
    heating_format: string;
    description: string;
    created_at: string;
    on_site_valuation: string | null;
    process_details: string;
    DPE: DPE;
    PROsettings: PROsettings;
    addressForm: Address;
    advantages: Advantages;
    contact: Contact;
    valuation?:Valuation;
    user?:User;
    media: Media;
    settings: Settings;
  }
  