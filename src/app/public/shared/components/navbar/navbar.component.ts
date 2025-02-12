import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  router = inject(Router)

  navigateTo(page:string){
    this.router.navigate([page])
  }
  
}
