import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket-component',
  standalone: false,
  templateUrl: './basket-component.html',
  styleUrl: './basket-component.css'
})
export class BasketComponent {
  constructor(private readonly router: Router) {
  }

  async goToProcess() {
    console.log("Click")
    await this.router.navigate(['/process-order'])
  }
}
