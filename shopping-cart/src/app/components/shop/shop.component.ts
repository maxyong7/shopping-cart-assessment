import { Component, OnInit } from '@angular/core';
import { keywordTypes } from 'src/app/ItemsInterface';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  itemList: any[] = [];

  constructor(private itemService: ItemsService) {

  }

  ngOnInit(): void {
    this.getItem()
  }


  getItem() {

    this.itemService.getItems(keywordTypes.items).subscribe((value) => this.itemList = value)
  }

  showUpdatedItem(newItem: any) {
    let updateItem = this.itemList.find(this.findIndexToUpdate, newItem.id);

    let index = this.itemList.indexOf(updateItem);


    this.itemList[index] = newItem;

  }

  findIndexToUpdate(newItem: any) {
    return newItem.id === this;
  }

}
