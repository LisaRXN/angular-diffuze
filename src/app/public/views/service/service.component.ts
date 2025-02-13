import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  price: number = 99;
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
        { maxSurface: 200, price: 300 },
        { maxSurface: 500, price: 340 },
        { maxSurface: Infinity, price: 380 },
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

    this.diffusionOptions.forEach((option) => {
      if (option.value) {
        if (option.isReportage) {
          const surfacePrices = option.price as SurfacePrice[];
          updatedPrice += this.getReportagePrice(this.surface, surfacePrices);
        } else {
          updatedPrice += option.price as number;
        }
      }
    });

    if (this.allOptionsExceptReportage()) {
      updatedPrice -= 50;
    }

    this.price = updatedPrice;
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
}
