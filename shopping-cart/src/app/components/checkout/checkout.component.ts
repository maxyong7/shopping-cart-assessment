import { Component, OnInit } from '@angular/core';
import { ItemsInterface } from 'src/app/ItemsInterface';
import { ItemsService } from 'src/app/services/items.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  cartedItemsList: any[] = []


  constructor(private itemService: ItemsService) {
  }

  ngOnInit(): void {
    this.getCartedItem()

  }

  getCartedItem() {
    this.itemService.getCartedItems().subscribe((value) => this.cartedItemsList = value)
  }

  clearAllItems() {
    for (let items of this.cartedItemsList) {

      items.quantity = 0
      items.inCart = false

      this.itemService.updateItem(items).subscribe()

      this.cartedItemsList = this.cartedItemsList.filter((t: any) => t.id !== items.id)
    }
  }

  clearItem(item: ItemsInterface) {
    item.quantity = 0
    item.inCart = false

    this.itemService.updateItem(item).subscribe()
    this.cartedItemsList = this.cartedItemsList.filter((t: any) => t.id !== item.id)
  }

  onSubmit() {
    let reqObj = {
      email: this.email.value,
      items: this.cartedItemsList
    }
    this.itemService.sendMessage(reqObj).subscribe()
    this.clearAllItems()
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
