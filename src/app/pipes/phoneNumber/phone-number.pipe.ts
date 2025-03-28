import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    
  if (!value) return '';
   // Supprimer tous les espaces et caractères non numériques
   const cleaned = value.replace(/\D/g, '');

   // Format standard français (exemple : 06 12 34 56 78)
   if (cleaned.length === 10) {
     return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
   }

   // Format international (+33 6 12 34 56 78)
   if (cleaned.length === 11 && cleaned.startsWith('33')) {
     return `+${cleaned.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6')}`;
   }

   return value; // Retourne tel quel si pas de format reconnu

  }

}
