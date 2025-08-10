import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-produit';
  showLayout = true;

  
  searchTerm: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        this.showLayout = !['/login', '/'].includes(url);
      });
  }

  toggleSidenav() {
    console.log('Toggle sidenav triggered');
  }

  onSearch() {
    if (!this.searchTerm?.trim()) return;

   
    this.router.navigate(['/produits'], { queryParams: { search: this.searchTerm } });
  }
}
