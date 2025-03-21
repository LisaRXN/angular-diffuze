import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "mapPrice",
})
export class MapPricePipe implements PipeTransform {
  transform(value: string): string {
    const valueNumber = parseFloat(value.replace(/\s/g, ''))
    if (valueNumber < 1000) {
      return value;
    } else if (valueNumber >= 1000000) {
      return valueNumber/ 1000000 + "M";
    } else {
      return valueNumber/ 1000 + "K";
    }
  }
}
