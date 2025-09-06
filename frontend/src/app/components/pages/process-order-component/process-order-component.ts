import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/products';
import {ProductsService} from '../../../services/products-service';
import {UtilitiesService} from '../../../services/utilities-service';
import {BasketService} from '../../../services/basket-service';
import {CreateOrder} from '../../../interfaces/order';

@Component({
  selector: 'app-process-order-component',
  standalone: false,
  templateUrl: './process-order-component.html',
  styleUrl: './process-order-component.css'
})
export class ProcessOrderComponent implements OnInit{
  products: Product[] = []

  constructor(private basketService: BasketService, private cd: ChangeDetectorRef, private readonly utilitiesService: UtilitiesService) {}

  ngOnInit() {

  }

  createPayment(){
    let order: CreateOrder = {
      "basket_id": 2,
      "total": "200",
      "status": "completed",
      "name": "Vnesa",
      "email": "vanesa.ribera15@gmail.com",
      "direction": "C invent",
      "city": "Calencia",
      "zip": "3124",
      "country": "España"
    }

    this.basketService.createOrder(order).subscribe({
      next: (order) => {
        this.cd.detectChanges();
      },
      error: err => console.error("Error al cargar productos", err)
    });
  }


}
