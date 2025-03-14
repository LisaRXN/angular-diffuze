import { Observable } from "rxjs";
import { Property } from "../models/property.model";
import { Ad, alertFilters } from '../models/ad.models';

export abstract class AlertGateway {

    abstract createAlert(filters:alertFilters):Observable<any>

}