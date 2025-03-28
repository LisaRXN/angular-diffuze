import { Observable } from "rxjs";
import { Property } from "../models/property.model";
import { alertDetails } from "../models/alert.models";

export abstract class AlertGateway {

    abstract createAlert(filters:alertDetails):Observable<any>

}