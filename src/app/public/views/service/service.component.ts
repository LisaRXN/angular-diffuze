import { Component, inject, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import optionsDetails from '../../../../assets/data/options.json';
import questionDetails from '../../../../assets/data/questions.json';
import { OptionComponent } from '../../shared/components/option/option.component';
import serviceDetails1 from '../../../../assets/data/service1.json';
import serviceDetails2 from '../../../../assets/data/service2.json';
import { CommonModule } from '@angular/common';
import { HowCardComponent } from '../../shared/components/how-card/how-card.component';
import { OptionSimulatorComponent } from './components/option-simulator/option-simulator.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { PackDialogComponent } from '../../shared/components/pack-dialog/pack-dialog.component';

interface Question {
  text: string;
  response: string;
}

@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    HowCardComponent,
    OptionSimulatorComponent,
    ServiceCardComponent,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  questions = questionDetails;
  isUnitService = true;
  currentServices = serviceDetails1;

  toggleService() {
    this.isUnitService = !this.isUnitService;
    this.currentServices = this.isUnitService
      ? serviceDetails1
      : serviceDetails2;
  }

  options = optionsDetails;
  optionView = this.options[0];

  activeOption(id: string) {
    const selectedOption = this.options.filter((opt) => opt.id === id);
    this.optionView = selectedOption[0];
  }

}
