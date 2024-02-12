import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  listProduct: Product[] = []

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

}
