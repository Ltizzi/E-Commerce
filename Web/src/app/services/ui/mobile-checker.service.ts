import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileCheckerService {
  private isMobile!: boolean;

  constructor() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth < 1024;
  }

  getIsMobile() {
    return this.isMobile;
  }
}
