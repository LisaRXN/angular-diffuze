import { Observable } from "rxjs";
import { Property } from "../../models/property.model";
import { PropertyGateway } from "../../ports/property.gateway";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class HttpPropertyGateway extends PropertyGateway {

    http = inject(HttpClient);


    override fetchLastProperties(): Observable<Property[]> {
        return this.http.get<Property[]>("/")
    }

    override fetchProperties(): Observable<Property[]> {
        return this.http.get<Property[]>("/")
    }
}
