import { Observable } from "rxjs";
import { Property } from "../models/property.model";
import { Ad } from "../models/ad.models";

export abstract class PropertyGateway {

    abstract fetchLastProperties():Observable<Property[]>

    abstract getPaidAds():Observable<Ad[]>

}