import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { VendorService } from '../services/vendor.service';

declare var $: any;

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private vendorService: VendorService,
    private title: Title) { }

  business_id;
  business_name;
  business_status;
  vendor_id;
  business_type;

  business_lists = [];
  business_lists_number = 0;

  items = [];
  items_number = 0;
  // Add item variables
  newItemName;
  newItemPrice;
  newItemQuality;
  selected_list_id = null;

  // Add list name
  newListName;

  ngOnInit() {

    // Get vendor details from localhost
    const vendor_obj = JSON.parse(localStorage.getItem('user'));
    this.vendor_id = vendor_obj.id;
    this.route.params.subscribe(params => {
      this.business_id = params['id'];
      // Get business from id
      this.vendorService.getBusinessById(this.business_id).subscribe(bus => {
        if (bus.success) {
          const b_obj = bus.msg[0];
          this.business_type = bus.msg[0].type;
          this.business_name = b_obj.business.name;
          this.title.setTitle(this.business_name);
          // Get business lists
          this.vendorService.getListsOfBusiness(this.business_id).subscribe(blists => {
            if (blists.success) {
              if (blists.msg.length > 0) {
                this.business_lists = blists.msg;
                this.business_lists_number = blists.msg.length;
              }else {
                this.business_lists_number = 0;
              }
            }else {
              // Error occured
              console.log(blists);
              if (blists.msg === 'No List found') {
                this.business_lists_number = 0;
              }
            }
          });
          // Get business items
          this.vendorService.getItemsOfBusiness(this.business_id).subscribe(bitems => {
            console.log(bitems);
            if (bitems.success) {
                if (bitems.msg.length > 0) {
                  this.items = bitems.msg;
                  this.items_number = bitems.msg.length;
                }else {
                  this.items_number = 0;
                }
            }else {
                // Error
                // alert('er');
                console.log(bitems);
                if (bitems.msg === 'No items found') {
                  // alert('nope');
                  this.items_number = 0;
                } else {
                  // Error occured
                }
            }
          });

        }else {
          // something went wrong
          console.log(bus);
        }
      });
    });
  }

  addItemClicked() {
    this.selected_list_id = null;
    // Trigger item add div
    $('.db').css({ 'display' : 'flex' });
    $('.add-list-div').css({ 'display' : 'none' });
    $('.add-item-div').css({ 'display' : 'flex' });
  }
  addItem() {
  const item_obj = {
    item_name: this.newItemName,
    item_data: null,
    item_price: this.newItemPrice,
    item_quality: this.newItemQuality,
    business_id: this.business_id,
    vendor_id: this.vendor_id,
    list_id: this.selected_list_id
  };
  this.vendorService.addItemToBusiness(item_obj).subscribe(added => {
    console.log(added);
    if (added.success) {
      $('#add-item-res').html('Item added successfully');
      this.items.push(item_obj);
      this.items_number++;
    }else {
      console.log(added);
    }
  });

  }
  newItemListSelected(event) {
    this.selected_list_id = event.target.value;
  }
  addListClicked() {
    // Trigger item add div
    $('.db').css({ 'display' : 'flex' });
    $('.add-item-div').css({ 'display' : 'none' });
    $('.add-list-div').css({ 'display' : 'flex' });
  }
  addListName() {
    const list_obj = {
      list_name: this.newListName,
      vendor_id: this.vendor_id,
      business_id: this.business_id
    };
    this.vendorService.addListToBusiness(list_obj).subscribe(ladd => {
      if (ladd.success) {
        this.business_lists.push(list_obj);
        $('.add-list-res').html('List added successfully');
        this.business_lists_number++;
        setTimeout(() => {
          $('.add-list-res').html('');
        }, 1500);
      }else {
        console.log(ladd);
      }
    });
  }

  mainCloseClicked() {
    // close db
    $('.db').hide();
  }

  deleteItem(id) {
    alert('delete' + id);
  }

  editItem(id) {
    alert('edit' + id);
  }

}
