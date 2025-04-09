import { Observable } from "rxjs";
import { Property } from "../models/property.model";
import { ContactDetails } from "../models/contactDetails";

export interface FetchPropertiesResponse {
    properties: Property[];
    message: string;
    count: number;
  }

export interface FetchAdResponse {
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
    properties: Property[];
  }

export abstract class PropertyGateway {

    abstract fetchLastProperties():Observable<Property[]>

    abstract fetchFilteredProperties(filters:any):Observable<FetchAdResponse>

    abstract fetchPropertyById(propertyId:string):Observable<Property | null>

    abstract sendPropertyInquiry(contactDetails: ContactDetails):Observable<any>
}