import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories = [
    { name: 'Crèmes', icon: '🧴' },
    { name: 'Sérums', icon: '💧' },
    { name: 'Nettoyants', icon: '🧼' },
    { name: 'Huiles', icon: '🌿' },
    { name: 'Masques', icon: '😷' },
  ];
}
