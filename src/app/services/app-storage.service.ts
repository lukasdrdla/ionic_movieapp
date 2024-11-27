import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializace úložiště
  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Nastavení hodnoty do úložiště
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Získání hodnoty z úložiště
  async get(key: string) {
    return await this._storage?.get(key);
  }

  // Odstranění hodnoty z úložiště
  async remove(key: string) {
    await this._storage?.remove(key);
  }

  // Vymazání všech položek
  async clear() {
    await this._storage?.clear();
  }

  // Získání všech klíčů
  async keys() {
    return await this._storage?.keys();
  }

  // Výčet všech položek
  async forEach() {
    return await this._storage?.forEach((key, value, index) => {
      console.log(key, value);
    });
  }

    // Uložení nastavení tématu
    setTheme(theme: string) {
      this.storage.set('theme', theme);
    }
  
    // Načtení nastavení tématu
    getTheme() {
      return this.storage.get('theme');
    }

}
