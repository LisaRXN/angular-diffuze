import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  isMobile(): boolean {
    return window.innerWidth <= 768;  
  }

  isTablet(): boolean {
    return window.innerWidth > 768 && window.innerWidth <= 1024; 
  }

  isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

}
