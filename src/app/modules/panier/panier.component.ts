import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Sarah Dubois',
      email: 'sarah@example.com',
      phone: '0600000001',
      role: 'Client',
      productsPurchased: ['Crème visage', 'Huile bio'],
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'jean@example.com',
      phone: '0600000002',
      role: 'Admin',
      productsPurchased: ['Savon naturel'],
      photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  ];

  // 👤 Utilisateur sélectionné pour la pop-up
  userSelectionne: User | null = null;

  // 🔍 Afficher les détails d'un utilisateur
  voirDetails(user: User) {
    this.userSelectionne = user;
  }

  // ❌ Fermer la pop-up
  fermerPopup() {
    this.userSelectionne = null;
  }

  // 🗑️ Supprimer un utilisateur
  supprimerUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
    this.fermerPopup();
  }
}
