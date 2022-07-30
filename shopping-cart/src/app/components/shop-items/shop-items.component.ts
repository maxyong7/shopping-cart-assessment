import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemsInterface } from 'src/app/ItemsInterface';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.css']
})
export class ShopItemsComponent implements OnInit {
  @Input() shopItems!: any
  @Output() sendUpdate: EventEmitter<ItemsInterface> = new EventEmitter
  constructor(private itemsService: ItemsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateCart() {

    this.openSnackBar()

    const updatedItem = {
      id: this.shopItems.id,
      name: this.shopItems.name,
      description: this.shopItems.description,
      quantity: this.shopItems.quantity,
      inCart: this.shopItems.inCart,
      image: this.shopItems.image

    }

    updatedItem.quantity += 1
    if (updatedItem.inCart === false) {

      updatedItem.inCart = true
    }

    this.itemsService.updateItem(updatedItem).subscribe()

    this.sendUpdate.emit(updatedItem)
  }

  openSnackBar() {
    let message = "Added item to cart!"
    let action = "Dismiss"
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }

}
