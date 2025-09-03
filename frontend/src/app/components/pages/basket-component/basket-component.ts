import { Component } from '@angular/core';
import {ContainerComponent} from '../general/container-component/container-component';

@Component({
  selector: 'app-basket-component',
  imports: [ContainerComponent],
  templateUrl: './basket-component.html',
  standalone: true,
  styleUrl: './basket-component.css'
})
export class BasketComponent {

}
