import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Headers, Http } from '@angular/http';
declare var $: any;
const moment = require('moment');

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private title: Title, private authService: AuthService, private http: Http) { }
  filesToUpload: Array<File> = [];
  business_id;
  business_name;
  custom_order_file;
  user_id = null;
  user_ip_address;
  ord_cnfr: Boolean = false;
  lists;
  all_items;
  added_to_wishlist = false;
  fb_available = false;
  twitter_available = false;
  linkedin_available = false;

  display_lists = [];
  cart = [];
  order_status: any = '';
  ngOnInit() {

    // clear cart
    localStorage.removeItem('temp_cart');
    $.getJSON('http://jsonip.com?callback=?', (data) => {
      const visit_obj = {
        user_id: this.user_id,
        user_ip: data.ip,
        business_id : this.business_id
      };
      this.userService.postVisitToBusiness(visit_obj).subscribe(res => {
        // console.log(res);
      });
    });
    const raw_user = localStorage.getItem('user');
    const user = JSON.parse(raw_user);
    this.user_id = user.id;
    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.business_id = params['b_id'];
      // Get business from id
      this.userService.getBusinessById(this.business_id).subscribe(bus => {
        if (bus.success) {
          const b_obj = bus.msg[0];
          this.business_name = b_obj.business.name;
          this.title.setTitle(b_obj.business.name + ' - Dashboard');
        }else {
          // something went wrong
          console.log(bus);
        }
      });
      // check if busienss is in wishlist
      const obj = {
        user_id: this.user_id,
        business_id: this.business_id
      };
      this.userService.checkBusinessInWishlist(obj).subscribe(res => {
        if (res.success) {
          if (res.msg.length > 0) {
            this.added_to_wishlist = true;
          }else {
            this.added_to_wishlist = false;
          }
        }else {
          // Error occured
          console.log(res);
        }
      });

      // Get user cart
      this.userService.getCart(this.user_id).subscribe(cart => {
        if ( cart.success ) {
            this.cart = cart.msg;
        }else {
          // erro occured
        }
      });
      this.userService.getListsOfBusiness(this.business_id).subscribe(lists => {
        if (lists.success) {
          this.lists = lists.msg;
          this.getListsOfBusiness();
        }
      });
      
    });

    // Post user's visit to vendor

    $('#tab-one-trig').click(function() {
      $('.tabs').hide();
      $('.tab-one').show();
      $('.tab-trig').removeClass('selected-trig');
      $(this).addClass('selected-trig');
    });
    $('#tab-two-trig').click(function() {
      $('.tabs').hide();
      $('.tab-two').show();
      $('.tab-trig').removeClass('selected-trig');
      $(this).addClass('selected-trig');
    });
    $('#tab-three-trig').click(function() {
      $('.tabs').hide();
      $('.tab-three').show();
      $('.tab-trig').removeClass('selected-trig');
      $(this).addClass('selected-trig');
    });
    $('#tab-four-trig').click(function() {
      $('.tabs').hide();
      $('.tab-four').show();
      $('.tab-trig').removeClass('selected-trig');
      $(this).addClass('selected-trig');
    });
    $('#tab-five-trig').click(function() {
      $('.tabs').hide();
      $('.tab-five').show();
      $('.tab-trig').removeClass('selected-trig');
      $(this).addClass('selected-trig');
    });
  }


  customFileUploaded(event) {
    this.custom_order_file = event.target.files['0'];
  }
  requestCustomOrder() {
    // const formData = new FormData();
    // formData.append('buyer_id', this.user_id);
    // formData.append('file', this.custom_order_file);
    // formData.append('business_id', this.business_id);
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append("uploads[]", files[0], files[0]['name'], this.user_id);
    formData.append('business_id', this.business_id);
    formData.append('user_id', this.user_id);
    this.userService.postCustomOrder(formData).subscribe(res => {
      console.log(res);
      if(res.status){
        alert('file uploaded sucesfully');
      } else {
        alert('something is wrong');
      }
    });

  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  addWishlistClicked() {
    const obj = {
      user_id: this.user_id,
      business_id: this.business_id
    };
    if (this.added_to_wishlist === true) {
      this.userService.removeBusinessInWishlist(obj).subscribe(res => {
        if (res.success) {
          // Removed successfully
          this.added_to_wishlist = false;
        }else {
          // Error
         
        }
      });
    }else {
      this.userService.addBusinessInWishlist(obj).subscribe(res => {
        if (res.success) {
          // Added
          this.added_to_wishlist = true;
        }else {
          // Error
          
        }
      });
    }
  }

  addToCartClicked(event, item_id, incart, cart_status) {
    const obj = {
      user_id: this.user_id,
      item_id: item_id,
      cart_status: !cart_status
    };
    const body_fill = event.target;
     switch (incart) {
       case true:
       incart = false;
          //  Remove from cart
          this.userService.removeItemFromCart(obj).subscribe(removed => {
            this.getListsOfBusiness();
          });
          $(event.target).parent().find('.cart-ico').html('<i class="fas fa-cart-plus" style="z-index:-1"></i>');
         break;
        case false:
          // Add to cart
          this.userService.removeItemFromCart(obj).subscribe(removed => {
            this.getListsOfBusiness();
            // if(removed.success) {
            //   $(event.target).parent().find('.cart-ico').html('<i class="fas fa-check" style="z-index:-1"></i>');
            // }else {

            // }
          });
          break;
       default:
         break;
     }
  }

  //post order 

  postOrder(){
    console.log(this.display_lists);
    console.log(this.user_id);
    var list_id = [];
    var id = [];
    for(let i in this.display_lists){
      for(let j in this.display_lists[i].list_items) {
        if(this.display_lists[i].list_items[j].cart_status){
          list_id.push(this.display_lists[i].list_items[j].list_id);
          id.push(this.display_lists[i].list_items[j]._id);
        }
        
      }
    }
    console.log(list_id);
    if(list_id.length){
      this.ord_cnfr = true;
      const data = {
        user_id: this.user_id,
        orders: list_id,
        id:id
      };
      this.userService.postOrder(data).subscribe( res => {
        console.log(res);
        if(res.success === true) {
        var refreshIntervalId = setInterval(()=> {
          this.userService.getConfirmation(res.msg[0]._id).subscribe(confirmation=>{
            console.log(confirmation);
            if(confirmation.success === true && confirmation.msg.confirmation !=='pending'){
              this.order_status = confirmation.msg.confirmation;
              clearInterval(refreshIntervalId);
              clearTimeout(clearSetTime);
              this.ord_cnfr = false;
              setTimeout(()=>{
                this.order_status = '';
              }, 5000);
            }
          });
        },4000);
        var clearSetTime = setTimeout(()=>{
            const data = {
              current_status: 'pending',
              modify_status: 'not responded',
              id: res.msg[0]._id
            }
            this.userService.setVendorRes(data).subscribe(confirmation=>{
              console.log(confirmation);
              this.ord_cnfr = false;
              clearInterval(refreshIntervalId);
              if(confirmation.success === true){
                this.order_status = 'not responded';
                setTimeout(()=>{
                  this.order_status = '';
                }, 5000);
              }
            }); 
          
          },50000);
          this.getListsOfBusiness();
        }
      });
    } 
  }

  // Get business Lists
  getListsOfBusiness(){
    this.lists.forEach(element => {
      this.userService.getItemsOfList(element._id).subscribe(items => {
        this.display_lists = [];
        if (items.success) {
          const i = items.msg;
          items.msg.forEach(item => {
            if (this.cart.length > 0) {
              this.cart.forEach(cartItem => {
                if (cartItem.cart.includes(item._id)) {
                  item.inCart = true;
                }else {
                  item.inCart = false;
                }
              });
            }else {
              item.inCart = false;
            }
          });
          this.lists.items = i;
          const list_obj = {
            list_name: element.list_name,
            list_id: element._id,
            list_items: items.msg
          };
          this.display_lists.push(list_obj);
        }else {
          // Error
        }
      });
    });
  }
  

}
