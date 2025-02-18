import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Service {
  id: string;
  image:string;
  backGroundColor:string;
  textColor:string;
  text:string[];
  list?: { img: string; text: string }
}

@Component({
  selector: 'app-service-card',
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {

  @Input() service!: Service;

}
