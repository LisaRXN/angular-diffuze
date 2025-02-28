interface addressForm {
    streetAutoComplete?:string;
    city?: string
    country?:string
    street_adress?:string
    zip_code?:string
}

interface Images {
    id:number;
    photo_path:string;
    name:string
    pos:number
}

interface Media {
    images?:Images[]
    videoURL?:string | null
}

export interface Property {
    id:number
    image?:string
    property_type?: string
    transaction_type?: string
    addressForm:addressForm
    living_space?: number 
    room?: number
    floor?: number
    selling_price?: string
    media?:Media
}
