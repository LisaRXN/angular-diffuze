import { Component, Input } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  text?: string;
  list?: { bold: string; text: string }[];
}

interface Option {
  id: string;
  image: string;
  features: Feature[];
  endText?: string;
}

@Component({
  selector: 'app-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {

  isActive = false

  @Input() option:Option ={
    id: "",
    image:"",
    features : [],
  }

  activeOption(){
    this.isActive = true
  }

}
