import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { ValidateService } from '../services/validate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
const moment = require('moment');
declare var $: any;

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(private vendorService: VendorService, private validate: ValidateService, private router: Router, private _formBuilder: FormBuilder) { }
  vendor_id;
  business_type;
  busniess_name;
  business_registered_name;
  contact_name;
  contact_number;
  contact_number_two;
  contact_number_three;
  contact_number_four;
  whatsapp_number;
  office_number;
  aadhar_number;
  address;
  email;
  payment_type_paytm;
  payment_type_cards;
  payment_type_cash;
  payment_type_other;
  payment_type_online;
  contact_num_count = 0;
  plan;
  all_cats;
  sub_cats;
  about_contact;
  gstin_flag;
  tan_flag;
  cin_flag;
  tan;
  gstin;
  cin;
  about_business;
  about_us;
  b_website;
  my_web;
  fb_link;
  twitter_link;
  yt_link;
  li_link;
  insta_link;
  selected_cat;
  selected_sub;

  location;
  lat;
  long;
  selected_sub_items = [];
  contact_numbers : any = [{number:''}];
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    // Select free plan by default
    this.bLabelSelect('free');
    // Get vendor from localhost
    this.vendorService.getCategories().subscribe(cats => {
      if (cats.success) {
        this.all_cats = cats.msg;
        console.log(this.all_cats);
      }else {
        alert('Cats not brought. View Console');
        console.log(cats);
      }
    });
    // Get vendor from localhost
    const vendor_obj = JSON.parse(localStorage.getItem('user'));
    this.vendor_id = vendor_obj.id;

    $('input').keyup(function(){
      $(this).css({ 'border-color': 'rgba(0,0,0,.4)' });
    })

  }
  createBusinessClicked() {
    const busniess_object = {
      type: this.business_type,
      name: this.busniess_name,
      contact_number : this.contact_number,
      address : this.address,
      email : this.email,
      business_registered_name: this.business_registered_name,
      contact_name: this.contact_name,
      contact_numbers: this.contact_numbers,
      whatsapp_number: this.whatsapp_number,
      office_number: this.office_number,
      aadhar_number: this.aadhar_number,
      gstin_flag: this.gstin_flag,
      tan_flag: this.gstin_flag,
      cin_flag: this.gstin_flag,
      gstin: this.gstin,
      tan: this.tan,
      cin: this.cin,
      about_contact: this.about_contact,
      about_business: this.about_business,
      about_us: this.about_us,
      my_web: this.my_web,
      b_website: this.b_website,
      fb_link: this.fb_link,
      twitter_link: this.twitter_link,
      yt_link: this.yt_link,
      li_link: this.li_link,
      insta_link: this.insta_link,
      payments : {
        paytm : this.payment_type_paytm,
        cash : this.payment_type_cash,
        cards : this.payment_type_cards,
        other : this.payment_type_other,
        online: this.payment_type_online
      },
      category : this.selected_cat,
      sub_category : this.selected_sub_items,
      plan: this.plan,
      // days : {
      //   monday: this.monday_check,
      //   tuesday : this.tuesday_check,
      //   wednesday : this.wednesday_check,
      //   thursday : this.thursday_check,
      //   friday : this.friday_check,
      //   saturday : this.saturday_check,
      //   sunday : this.sunday_check
      // },
      // timings : {
      //   monday : {
      //     opening : this.monday_opening,
      //     closing: this.monday_closing
      //   },
      //   tuesday : {
      //     opening : this.tuesday_opening,
      //     closing : this.tuesday_closing
      //   },
      //   wednesday : {
      //     opening : this.wednesday_opening,
      //     closing : this.wednesday_closing
      //   },
      //   thursday : {
      //     opening: this.thursday_opening,
      //     closing : this.thursday_closing
      //   },
      //   friday : {
      //     opening : this.friday_opening,
      //     closing : this.friday_closing
      //   },
      //   saturday : {
      //     opening: this.saturday_opening,
      //     closing : this.saturday_closing
      //   },
      //   sunday : {
      //     opening : this.sunday_opening,
      //     closing : this.sunday_closing
      //   }
      // }
    };
    const pobj = {
      business: busniess_object,
      added_time:  moment().format('MMMM Do YYYY, h:mm:ss a'),
      vendor_id: this.vendor_id,
      plan: this.plan,
      type: this.business_type,
    };
    this.vendorService.addBusiness(pobj).subscribe(posted => {
      console.log(posted);
      if (posted.success) {
        // Action after business posting
        // Redirect to home
        this.router.navigate(['/home']);
        // Redirect to add products if product based or add services if service based
        if (this.business_type === 'product') {
          // Redirect to add product page
          this.router.navigate(['/add-products'], {queryParams: {business_id: posted.msg[0].business_id}} );
        }else {
          if (this.business_type === 'service') {
            // Redirect to add service page
            this.router.navigate(['/add-services'], {queryParams: {business_id: posted.msg[0].business_id}} );
          }
        }
      }else {
        alert('Something went wrong');
      }
    });
  }
  catSelected(cat_id) {
    this.selected_sub_items = [];
    console.log(this.selected_sub_items);
    this.selected_sub = null;
    this.selected_cat = cat_id;
    this.vendorService.getSubCategoriesOfCat(this.selected_cat).subscribe(subs => {
      if (subs.success) {
        this.sub_cats = subs.msg;
      }else {
        alert('Something went wrong');
      }
    });
  }
  opentimeSelected(value, day) {
    // switch (day) {
    //   case 'monday':
    //     this.monday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'tuesday':
    //     this.tuesday_opening = value;
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'wednesday':
    //     this.wednesday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'thursday':
    //     this.thursday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'friday':
    //     this.friday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'saturday':
    //     this.saturday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     if (this.sunday_opening === null) {
    //       this.sunday_opening = value;
    //       $('#sunday_open_select').val(value);
    //     }
    //     break;
    //   case 'sunday':
    //     this.sunday_opening = value;
    //     if (this.tuesday_opening === null) {
    //       this.tuesday_opening = value;
    //       $('#tuesday_open_select').val(value);
    //     }
    //     if (this.wednesday_opening === null) {
    //       this.wednesday_opening = value;
    //       $('#wednesday_open_select').val(value);
    //     }
    //     if (this.thursday_opening === null) {
    //       this.thursday_opening = value;
    //       $('#thursday_open_select').val(value);
    //     }
    //     if (this.friday_opening === null) {
    //       this.friday_opening = value;
    //       $('#friday_open_select').val(value);
    //     }
    //     if (this.saturday_opening === null) {
    //       this.saturday_opening = value;
    //       $('#saturday_open_select').val(value);
    //     }
    //     if (this.monday_opening === null) {
    //       this.monday_opening = value;
    //       $('#monday_open_select').val(value);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }
  closetimeSelected(value, day) {
    // switch (day) {
    //   case 'monday':
    //     this.monday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'tuesday':
    //     this.tuesday_closing = value;
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'wednesday':
    //     this.wednesday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'thursday':
    //     this.thursday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'friday':
    //     this.friday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'saturday':
    //     this.saturday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     if (this.sunday_closing === null) {
    //       this.sunday_closing = value;
    //       $('#sunday_close_select').val(value);
    //     }
    //     break;
    //   case 'sunday':
    //     this.sunday_closing = value;
    //     if (this.tuesday_closing === null) {
    //       this.tuesday_closing = value;
    //       $('#tuesday_close_select').val(value);
    //     }
    //     if (this.wednesday_closing === null) {
    //       this.wednesday_closing = value;
    //       $('#wednesday_close_select').val(value);
    //     }
    //     if (this.thursday_closing === null) {
    //       this.thursday_closing = value;
    //       $('#thursday_close_select').val(value);
    //     }
    //     if (this.friday_closing === null) {
    //       this.friday_closing = value;
    //       $('#friday_close_select').val(value);
    //     }
    //     if (this.saturday_closing === null) {
    //       this.saturday_closing = value;
    //       $('#saturday_close_select').val(value);
    //     }
    //     if (this.monday_closing === null) {
    //       this.monday_closing = value;
    //       $('#monday_close_select').val(value);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }
  bLabelSelect(plan) {
    switch (plan) {
      case 'free':
        // Add class to free-b-label
        $('.b-label').removeClass('selected-label');
        $('#free-b-label').addClass('selected-label');
        // Change text inside free-b-label
        $('.b-label').html('Select');
        $('#free-b-label').html('Selected &nbsp <i class="fas fa-check"></i>');
        // Add selecte-b class to free-b-plan
        $('.b-plan').removeClass('selected-b-plan');
        $('#free-b-plan').addClass('selected-b-plan');
        this.plan = 'free';
        break;
      case 'gold':
        // Add class to gold-b-label
        $('.b-label').removeClass('selected-label');
        $('#gold-b-label').addClass('selected-label');
        // Change text inside gold-b-label
        $('.b-label').html('Select');
        $('#gold-b-label').html('Selected &nbsp <i class="fas fa-check"></i>');
        $('.b-plan').removeClass('selected-b-plan');
        $('#gold-b-plan').addClass('selected-b-plan');
        this.plan = 'gold';
        break;
      case 'silver':
        // Add class to silver-b-label
        $('.b-label').removeClass('selected-label');
        $('#silver-b-label').addClass('selected-label');
        // Change text inside silver-b-label
        $('.b-label').html('Select');
        $('#silver-b-label').html('Selected &nbsp <i class="fas fa-check"></i>');
        $('.b-plan').removeClass('selected-b-plan');
        $('#silver-b-plan').addClass('selected-b-plan');
        this.plan = 'silver';
        break;
      case 'platinum':
        // Add class to pl-b-label
        $('.b-label').removeClass('selected-label');
        $('#pl-b-label').addClass('selected-label');
        // Change text inside pl-b-label
        $('.b-label').html('Select');
        $('#pl-b-label').html('Selected &nbsp <i class="fas fa-check"></i>');
        $('.b-plan').removeClass('selected-b-plan');
        $('#pl-b-plan').addClass('selected-b-plan');
        this.plan = 'platinum';
        break;
      default:
        break;
    }
  }
  typeSelected(type) {
    switch (type) {
      case 'product':
        $('.type-select').removeClass('selected-type-select');
        $('#product-select').addClass('selected-type-select');
        $('#service-select').html('Service Based');
        $('#product-select').html('<i class="fas fa-check"></i> &nbsp Product Based');
        this.business_type = 'product';
        break;
      case 'service':
        $('.type-select').removeClass('selected-type-select');
        $('#service-select').addClass('selected-type-select');
        $('#product-select').html('Product Based');
        $('#service-select').html('<i class="fas fa-check"></i> &nbsp Service Based');
        this.business_type = 'service';
        break;
      default:
        break;
    }
  }
  // Get Location
  locateVendor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        if (this.location === undefined || this.location === null) {
        } else {
          this.vendorService.getLocation(this.lat, this.long).subscribe(res => {
            console.log(res);
            if (res) {
              this.address = res.results[0].formatted_address;
            }
          });
        }
      });
    }
  }
  addContactNumberClicked(){
    this.contact_numbers.push({number:''});
    // switch (this.contact_num_count) {
    //   case 0:
    //     if(this.validate.validateInput(this.contact_number)) {
    //       if(this.validate.validateMobile(this.contact_number)) {
    //         // Show contact num two
    //         $('#contact_number_two').show();
    //         this.contact_num_count++;
    //       }else {
    //         $('#contact-number').css({ 'border': '1px solid #f00' });
    //       }
    //     }else{
    //         $('#contact-number').css({ 'border': '1px solid #f00' });
    //     }
    //     break;
    //   case 1:
    //     if(this.validate.validateInput(this.contact_number_two)) {
    //       if(this.validate.validateMobile(this.contact_number_two)) {
    //         // Show contact num three
    //         $('#contact_number_three').show();
    //         this.contact_num_count++;
    //       }else {
    //         $('#contact_number_two').css({ 'border': '1px solid #f00' });
    //       }
    //     }else{
    //         $('#contact_number_two').css({ 'border': '1px solid #f00' });
    //     }
    //     this.contact_num_count++;
    //     break;
    //   case 2:
    //     if(this.validate.validateInput(this.contact_number_two)) {
    //       if(this.validate.validateMobile(this.contact_number_two)) {
    //         // Show contact num four
    //         $('#contact_number_four').show();
    //         this.contact_num_count++;
    //       }else {
    //         $('#contact_number_three').css({ 'border': '1px solid #f00' });
    //       }
    //     }else{
    //         $('#contact_number_three').css({ 'border': '1px solid #f00' });
    //     }
    //     break;
    
    //   default:
    //     break;
    // }
  }
  subCheckChanged(event) {
    console.log(this.selected_sub_items);
    var target = event.target;
    switch (event.target.checked) {
      case true:
        // Add the id to array
        this.selected_sub_items.push(event.target.value);
        // console.log(this.selected_sub_items);
        $(target).parent().parent().addClass('selected-sub');
        break;
        case false:
        // this.selected_sub_items.push(event.target.value);
        this.selected_sub_items.forEach(element => {
          if (element === event.target.value) {
              this.selected_sub_items.splice(this.selected_sub_items.indexOf(event.target.value),1);
              $(target).parent().parent().removeClass('selected-sub');
          }
        });
        // console.log(this.selected_sub_items);
        break;
    
      default:
        break;
    }
  }
  nextClicked(step){
    switch (step) {
      case "one":
        // Goto step two
        $('.business-steps').hide();
        $('.step-one').show();
        var bodytop = $('body, html').offset().top;
        $('body, html').animate({ scrollTop: bodytop  }, 500);
        break;
      case "two":
        // Goto step two
        $('.business-steps').hide();
        $('.step-two').show();
        var bodytop = $('body, html').offset().top;
        $('body, html').animate({ scrollTop: bodytop  }, 500);
        break;
      case "three":
        // Goto step two
        $('.business-steps').hide();
        $('.step-three').show();
        $('body, html').animate({ scrollTop: bodytop  }, 500);
        break;
      case "four":
        // Goto step two
        $('.business-steps').hide();
        $('.step-four').show();
        break;
    
      default:
        break;
    }
  }


  getcategoriesonSection(section){
    this.vendorService.getCategoriesonSection(section).subscribe(cats => {
      if (cats.success) {
        this.all_cats = cats.msg;
        console.log(this.all_cats);
      }else {
        alert('Cats not brought. View Console');
        console.log(cats);
      }
    });
  }
}
