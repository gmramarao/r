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

  business_id;
  business_name;
  custom_order_file;
  user_id = null;
  user_ip_address;

  lists;
  all_items;
  added_to_wishlist = false;
  facebook_available = false;
  twitter_available = false;
  linkedin_available = false;

  display_lists = [];
  cart = [];

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
          console.log(cart);
        }
      });

      // Get business Lists
      this.userService.getListsOfBusiness(this.business_id).subscribe(lists => {
        if (lists.success) {
          this.lists = lists.msg;
          this.lists.forEach(element => {
            this.userService.getItemsOfList(element._id).subscribe(items => {
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
    const formData = new FormData();
    formData.append('buyer_id', this.user_id);
    formData.append('file', this.custom_order_file);
    formData.append('business_id', this.business_id);
    this.userService.postCustomOrder(formData).subscribe(res => {
      console.log(res);
    });

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
          console.log(res);
        }
      });
    }else {
      this.userService.addBusinessInWishlist(obj).subscribe(res => {
        if (res.success) {
          // Added
          this.added_to_wishlist = true;
        }else {
          // Error
          console.log(res);
        }
      });
    }
  }

  addToCartClicked(event, item_id, incart) {
    const obj = {
      user_id: this.user_id,
      item_id: item_id
    };
     switch (incart) {
       case true:
       // Remove from temp cart
       // Get from localstorage
       // Convert from string to array
       // Find and remove item in array
        // Remove from cart
        this.userService.removeItemFromCart(obj).subscribe( rem => {
          if (rem.success) {
            // $(event.target).parent().find('.cart-ico').html('<i class="fas fa-cart-plus" style="z-index:-1"></i>');
            // change inCart for item in this.displaylists
            this.display_lists.forEach(el => {
              el.list_items.forEach(le => {
                console.log(item_id);
                console.log(le._id);
                if (le._d === item_id) {
                  alert('match');
                  // Change incart
                  // le.inCart = false;
                  // console.log(le.inCart);
                }else {
                  alert('no match');
                }
              });
            });
          }else {
            // Error occured
            console.log(rem);
          }
        });
         break;
        case false:
          alert('add to cart');
          // Add to temp cart
          // Get from localstorage
          // const temp_cart = localStorage.getItem('temp_cart');
          // if (temp_cart === undefined || temp_cart === null) {
          //   // Localstorage is empty
          //   alert('empty');
          //   const cart = [ item_id ];
          //   // cart.push(item_id);
          //   // console.log(cart);
          //   localStorage.setItem('temp_cart', cart.toString());
          // }else {
          //   alert('not empty');
          // }

          // Convert from string to array
          // Push item to array

          // Add the id to cart
          const body_fill = event.target;
          this.userService.addItemToCart(obj).subscribe(res => {
            if (res.success) {
              console.log('added');
              console.log(res.msg);
              // $(event.target).parent().find('.cart-ico').html('<i class="fas fa-check" style="z-index:-1"></i>');
              // Change inCart for item
              this.display_lists.forEach(el => {
                el.list_items.forEach(le => {
                  console.log(le._id);
                  if (le._d === item_id) {
                    // Change incart
                    le.inCart = true;
                  }
                });
              });
            }else {
              console.log('error');
              console.log(res.msg);
            }
          });
          break;
       default:
         break;
     }
  }

}
