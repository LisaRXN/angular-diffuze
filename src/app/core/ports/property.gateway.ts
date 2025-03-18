import { Observable } from "rxjs";
import { Property } from "../models/property.model";

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

}