import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonToggle  } from '@ionic/angular/standalone';
import { AppStorageService } from './services/app-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonToggle]
})
export class AppComponent {
  isDarkMode: boolean = false;

  constructor(private storage: AppStorageService) {
    this.loadTheme();
  }

  async loadTheme() {
    const storedTheme = await this.storage.getTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Pokud je preference uložena, použijeme ji, jinak nastavíme podle systémového režimu
    if (storedTheme) {
      document.body.setAttribute('theme', storedTheme);
      this.isDarkMode = storedTheme === 'dark';
    } else if (prefersDark.matches) {
      document.body.setAttribute('theme', 'dark');
      this.isDarkMode = true;
    } else {
      document.body.setAttribute('theme', 'light');
      this.isDarkMode = false;
    }

    // Posloucháme změny systémového režimu (pokud uživatel změní systémový režim)
    prefersDark.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.setAttribute('theme', 'dark');
        this.isDarkMode = true;
      } else {
        document.body.setAttribute('theme', 'light');
        this.isDarkMode = false;
      }
    });
  }

  async toggleDarkMode(event: any) {
    const theme = event.detail.checked ? 'dark' : 'light';
    document.body.setAttribute('theme', theme);
    this.isDarkMode = event.detail.checked;

    // Uložíme preferenci uživatele do storage
    await this.storage.setTheme(theme);
  }
  

}
