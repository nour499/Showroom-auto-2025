import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auto } from '../models/auto';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBar {

  @Input() autos: Auto[] = [];
  @Output() selectAutoEvent = new EventEmitter<Auto>();

  brand: string = '';
  model: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  filteredAutos: Auto[] = [];

  // Méthode améliorée de recherche
  searchAutoList() {
    this.filteredAutos = this.autos.filter(auto => {
      const matchesBrand = this.brand ? auto.brand.toLowerCase().includes(this.brand.toLowerCase()) : true;
      const matchesModel = this.model ? auto.model.toLowerCase().includes(this.model.toLowerCase()) : true;
      const matchesMinPrice = this.minPrice != null ? auto.price >= this.minPrice : true;
      const matchesMaxPrice = this.maxPrice != null ? auto.price <= this.maxPrice : true;
      return matchesBrand && matchesModel && matchesMinPrice && matchesMaxPrice;
    });
  }

  selectedAuto(auto: Auto) {
    this.selectAutoEvent.emit(auto);
  }
}
