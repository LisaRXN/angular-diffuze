export interface Filters{
    hasType: string;
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
    location: string[];
  };


interface Photos {
    id:number;
    id_ad:number;
    photo_path:string;
    name:string
    pos:number
}

export interface Ad {
    CE?: string;
    CEletter?: string;
    CEmax?: number;
    CEmin?: number;
    CP?: any;
    CodePromoPeriode?: any;
    CodePromoReduction?: any;
    DPEdate?: string;
    EG?: string;
    EGletter?: string;
    bedroom: number;
    city?: string;
    comments?: string;
    construction_period?: any;
    country?: string;
    created_at?: string;
    description?: string;
    end_pause?: any;
    epoch_time?: number;
    exclusive_mandate?: number;
    fees?: string;
    fees_price?: any;
    firstName?: string;
    floor?: string;
    forfait?: number;
    forfaitPeriode?: number;
    forfait_type?: number;
    gedeon_ref?: number;
    gender?: string;
    general_condition?: any;
    has_DPE?: number | null;
    has_balcony?: number | null;
    has_box?: number | null | null;
    has_calm?: number | null;
    has_cellar?: number | null;
    has_crossing?: number | null;
    has_elevator?: number | null;
    has_equipped?: number | null;
    has_exceptionalView?: number | null;
    has_furnished?: number | null;
    has_luminous?: any;
    has_noOppositeView?: any;
    has_openedKitchen?: any;
    has_parking?: number | null;
    has_storage?: any;
    has_superIntendent?: any;
    has_terrace?: number | null;
    heating_format?: string;
    heating_type?: string;
    id: number;
    id_ad_settings?: number;
    id_order?: number;
    id_source?: any;
    id_user?: number;
    isSold?: number;
    is_valid?: number;
    land_area?: number;
    lastName?: string;
    latitude?: number;
    living_space: number;
    longitude?: number;
    lots?: any;
    mail?: string;
    on_site_valuation?: any;
    online_at?: any;
    paid_at?: string;
    phone?: string;
    photos?: Photos[];
    process?: any;
    process_details?: any;
    property_type?: string;
    rent_by_month?: any;
    rental_expenses?: any;
    room: number;
    selling_price?: string;
    sign_up?: string;
    start_pause?: any;
    state?: number;
    streetAutoComplete?: any;
    street_address?: string;
    total_floor?: number;
    transaction_type?: string;
    type_id?: number;
    urlVideo?: string;
    user_type?: number;
    zip_code?: string;
  }
  


