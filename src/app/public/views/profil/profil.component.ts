import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profil-container">
      <h1>Mon Profil</h1>
      <!-- Ajoutez ici le contenu de votre profil -->
    </div>
  `,
  styles: [
    `
      .profil-container {
        padding: 2rem;
      }
    `,
  ],
})
export class ProfilComponent {
  // Logique du composant ici
}
