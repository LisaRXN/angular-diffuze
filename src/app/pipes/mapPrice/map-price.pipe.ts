import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: "mapPrice",
})
export class MapPricePipe implements PipeTransform {
  transform(value: string): string {
    if (parseFloat(value) < 1000) {
      return value;
    } else if (parseFloat(value) >= 1000000) {
      return parseFloat(value) / 1000000 + "M";
    } else {
      return value.slice(0, -3) + "K";
    }
  }
}
