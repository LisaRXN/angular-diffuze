import { Component, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import optionsDetails from '../../../../../../assets/data/options.json';
import { OptionComponent } from '../../../../shared/components/option/option.component';
import { PackDialogComponent } from '../../../../shared/components/pack-dialog/pack-dialog.component';

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
  selector: 'app-option-simulator',
  imports: [CommonModule, OptionComponent, PackDialogComponent],
  templateUrl: './option-simulator.component.html',
  styleUrl: './option-simulator.component.scss',
})
export class OptionSimulatorComponent {
  @Input() isUnitService: boolean = false;
  @ViewChild(PackDialogComponent) dialogComponent!: PackDialogComponent;

  options = optionsDetails;
  isOpenOption = false;
  optionView = this.options[0];
  allOptionsChecked = false;

  activeOption(id: string) {
    this.isOpenOption = false ? this.isOpenOption : true;
    const selectedOption = this.options.filter((opt) => opt.id === id);
    this.optionView = selectedOption[0];
  }

  openOption() {
    this.isOpenOption = !this.isOpenOption;
    this.optionView = this.isOpenOption ? this.optionView : this.options[0];
  }

  price: number = 99;
  price2: number = 0;
  surface: number = 0;
  isInputDisabled: boolean = false;

  diffusionOptions: DiffusionOption[] = [
    {
      id: 'option1',
      label: 'Diffusion sur Belles Demeures et Lux-Résidence',
      value: false,
      price: 200,
    },
    {
      id: 'option2',
      label: 'Diffusion sur Green-Acres',
      value: false,
      price: 90,
    },
    {
      id: 'option3',
      label: 'Diffusion sur Gens de Confiance',
      value: false,
      price: 60,
    },
    {
      id: 'option4',
      label: 'Diffusion sur Jinka',
      value: false,
      price: 60,
    },
    {
      id: 'reportage',
      label: 'Reportage photo professionnel + visite 3D',
      value: false,
      price: [
        { maxSurface: 49, price: 120 },
        { maxSurface: 74, price: 130 },
        { maxSurface: 119, price: 140 },
        { maxSurface: 159, price: 150 },
        { maxSurface: 199, price: 160 },
        { maxSurface: Infinity, price: 160 },
      ],
      isReportage: true,
    },
  ];

  addOption(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const option = this.diffusionOptions.find((opt) => opt.id === checkbox.id);
    if (option) {
      option.value = checkbox.checked;
      if (option.isReportage) {
        this.isInputDisabled = checkbox.checked;
      }
    }
    this.updatePrice();
  }
  private getReportagePrice(surface: number, prices: SurfacePrice[]): number {
    return (
      prices.find((p) => surface <= p.maxSurface)?.price || prices[0].price
    );
  }

  private updatePrice() {
    let updatedPrice = 99;
    let updatedPrice2 = 0;

    this.diffusionOptions.forEach((option) => {
      if (option.value) {
        if (option.isReportage) {
          const surfacePrices = option.price as SurfacePrice[];
          updatedPrice += this.getReportagePrice(this.surface, surfacePrices);
          updatedPrice2 += this.getReportagePrice(this.surface, surfacePrices);
        } else {
          updatedPrice += option.price as number;
        }
      }
    });

    if (this.allOptionsExceptReportage()) {
      this.allOptionsChecked = true;
      updatedPrice -= 50;
    } else {
      this.allOptionsChecked = false;
    }

    this.price = updatedPrice;
    this.price2 = updatedPrice2;
  }

  allOptionsExceptReportage(): boolean {
    return this.diffusionOptions
      .filter((opt) => !opt.isReportage)
      .every((opt) => opt.value);
  }

  addSurface(event: Event) {
    const input = event.target as HTMLInputElement;
    this.surface = Number(input.value);
    this.updatePrice();
  }

  openModal() {
    if (this.dialogComponent) {
      this.dialogComponent.openModal();
    } else {
      console.error('modalComponent est undefined');
    }
  }
}
