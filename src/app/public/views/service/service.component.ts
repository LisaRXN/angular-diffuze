import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import optionsDetails from '../../../../assets/data/options.json'
import { OptionComponent } from '../../shared/components/option/option.component';
import serviceDetails1 from '../../../../assets/data/service1.json'
import serviceDetails2 from '../../../../assets/data/service2.json'
import { CommonModule } from '@angular/common';
import { HowCardComponent } from '../../shared/components/how-card/how-card.component';
import { OptionSimulatorComponent } from './components/option-simulator/option-simulator.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';

interface Question {
  id:string,
  text:string,
  response:string,
  open:boolean
}

interface SurfacePrice {
  maxSurface: number;
  price: number;
}

interface DiffusionOption {
  id: string;
  label: string;
  value: boolean;
  price: number | SurfacePrice[];
  isReportage?: boolean;
}

@Component({
  selector: 'app-service',
  imports: [CommonModule, ButtonComponent, OptionComponent, HowCardComponent, OptionSimulatorComponent, ServiceCardComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {

  openQuesion:boolean = false

  services_offre1 = serviceDetails1
  services_offre2 = serviceDetails2
  services = this.services_offre1;

  service1 = signal<boolean>(true)

  options = optionsDetails;
  optionView = this.options[0]

  questions:Question[] = [
    {id:"1", text: "Question n°1", response:"Voici la réponse à la question", open:false},
    {id:"2", text: "Question n°2", response:"Voici la réponse à la question", open:false},
    {id:"3", text: "Question n°3", response:"Voici la réponse à la question", open:false},
    ]

  activeOption(id:string){
    const selectedOption = this.options.filter((opt)=>opt.id === id )
    this.optionView = selectedOption[0]
  }

  toggleService(){
    this.service1.update(service1 => !service1)    
    if(this.service1()){
      this.services = this.services_offre1
    }else{
      this.services = this.services_offre2
    }
  }

  openQuestion(id:string){
    this.questions.filter( question => question.id != id).map(question => question.open = false)
    this.questions.filter( question => question.id === id).map(question => question.open = !question.open )
  }
}
