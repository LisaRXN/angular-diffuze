import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Option = { name:string, value: boolean; price: number };
type Checkboxes = Record<string, Option>

@Component({
  selector: 'app-service',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {

  price:number = 99
  surface: number = 0;
  isBoxDisabled:boolean = true
  isInputDisabled:boolean = false

  checkboxes: Checkboxes = {
    option1: { 'name':'option1','value': false, 'price': 200 },
    option2: { 'name':'option2','value': false, 'price': 90 },
    option3: { 'name':'option3','value': false, 'price': 60 },
    option4: {'name':'option4', 'value': false, 'price': 60 },
  };

  checkboxReportage: Checkboxes = {
    option5: { 'name':'option5', 'value': false, 'price': 300 }
  }

  addOption(event:Event, option:string){
    const checkbox = event.target as HTMLInputElement;
    this.checkboxes[option].value = checkbox.checked;
    let updatedPrice = 99

    if(this.checkboxReportage['option5'].value){
      updatedPrice += this.checkboxReportage['option5'].price
    }
    
    for( let option in this.checkboxes){
      if(this.checkboxes[option].value){
        updatedPrice += this.checkboxes[option].price
      }
    }
    if(this.allOptions()){
      updatedPrice -= 50
    }

    this.price = updatedPrice
  }

 addReportage(event:Event, option:string){  
    const checkbox = event.target as HTMLInputElement;
    this.checkboxReportage[option].value = checkbox.checked;
    this.isInputDisabled = checkbox.checked
    
    let updatedPrice:number = 99
    let optionPrice = this.checkboxReportage[option].price

    for( let option in this.checkboxes){
      if(this.checkboxes[option].value){
        updatedPrice += this.checkboxes[option].price
      }
    }

    if(this.allOptions()){
      updatedPrice -= 50
    }

    for( let option in this.checkboxReportage){
      if(this.surface > 200 && this.surface < 500){
        optionPrice = 340
      }
      if (this.surface >= 500 ){
        optionPrice = 380
      }
      if(this.checkboxReportage[option].value){
        updatedPrice += optionPrice
      }
    }

    this.price = updatedPrice
}


  allOptions(){
    return Object.values(this.checkboxes).every( (option:Option) => option.value)
  }

  addSurface(event:Event){
    this.isBoxDisabled = false
    const input = event.target as HTMLInputElement
    const surface = input.value
    this.surface = parseInt(surface)
  }

}
