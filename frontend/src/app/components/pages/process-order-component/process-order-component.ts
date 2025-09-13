import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/products';
import {ProductsService} from '../../../services/products-service';
import {UtilitiesService} from '../../../services/utilities-service';
import {BasketService} from '../../../services/basket-service';
import {CreateOrder} from '../../../interfaces/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Basket} from '../../../interfaces/basket';

@Component({
  selector: 'app-process-order-component',
  standalone: false,
  templateUrl: './process-order-component.html',
  styleUrl: './process-order-component.css'
})
export class ProcessOrderComponent implements OnInit{
  products: Product[] = []
  form!: FormGroup;
  orderId!: number
  basket!: Basket

  constructor(private basketService: BasketService, private cd: ChangeDetectorRef, private readonly utilitiesService: UtilitiesService,private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);

    this.basketService.getBasketById(this.orderId).subscribe({
      next: (basket: Basket) => {
        if(basket.finished === 0){
          this.basket = basket; // forzar nueva referencia
        }

        this.cd.detectChanges();
      },
      error: (err) => console.error("Error al cargar productos", err)
    });
  }

  async createPayment() {
    let order: CreateOrder = {
      "basket_id": this.orderId,
      "total": this.utilitiesService.calculateTotal(this.basket.products),
      "status": "pending",
      "name": this.form.get('name')?.value,
      "email": this.form.get('email')?.value,
      "direction": this.form.get('direction')?.value,
      "city": this.form.get('city')?.value,
      "zip": this.form.get('zip')?.value,
      "country": this.form.get('country')?.value
    }

    this.basketService.createOrder(order).subscribe({
      next: async (order) => {

        this.cd.detectChanges();
      },
      error: err => console.error("Error al cargar productos", err)
    });

    await this.router.navigate(['my-orders'])
  }




}
