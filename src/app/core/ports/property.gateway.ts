import { Observable } from "rxjs";
import { Property } from "../models/property.model";

export abstract class PropertyGateway {

    abstract fetchLastProperties():Observable<Property[]>

    abstract fetchProperties():Observable<Property[]>

}