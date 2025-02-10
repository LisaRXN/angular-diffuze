import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-white shadow-md">
        <!-- <app-dashboard-sidebar></app-dashboard-sidebar> -->
      </aside>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class DashboardComponent {}
