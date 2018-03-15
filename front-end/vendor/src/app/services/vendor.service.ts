import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class VendorService {
    authToken: any;
    user: any;
    constructor(private http: Http) { }

    // Vendor Location
    // Maps API Key :  AIzaSyAlfN_GR681GxDY-CAoUSGbY2xJIhE4GsY
    getLocation(lat: number, long: number) {
      // tslint:disable-next-line:max-line-length
      return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyAlfN_GR681GxDY-CAoUSGbY2xJIhE4GsY').map
          ((response) => response.json());
    }

    // Get vendor businesses
    getVendorBusinesses(vendor_id) {
      return this.http.get('http://localhost:3000/vendor/get-vendor-businesses/' + vendor_id).map(res => res.json());
    }
    // Add new business
    addBusiness(add_business_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/add-business', add_business_obj, { headers: header }).map(res => res.json());
    }
    getVendorById(vendor_id) {
      return this.http.get('http://localhost:3000/vendor/get-vendor-by-id/' + vendor_id).map(res => res.json());
    }
    getBusinessById(id) {
      return this.http.get('http://localhost:3000/vendor/get-business-by-id/' + id).map(res => res.json());
    }

    // Business open/close status
    postBusinessStatus(b_status_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-business-status', b_status_obj, { headers: header }).map(res => res.json());
    }
    // Business open/close status
    getBusinessStatus(b_id) {
      // tslint:disable-next-line:max-line-length
      return this.http.get('http://localhost:3000/vendor/get-business-status/' + b_id).map(res => res.json());
    }

    // Post business products
    postBusinessProducts(b_items_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-bu', b_items_obj, { headers: header }).map(res => res.json());
    }

    postBusinessServices(b_services_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-order', b_services_obj, { headers: header }).map(res => res.json());
    }

    // post busniess offers
    postBusniessOffers(b_offers_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-order', b_offers_obj, { headers: header }).map(res => res.json());
    }

    // Posting business Logo
    postBusniessLogo(logo_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-order', logo_obj, { headers: header }).map(res => res.json());
    }
    // Posting business Logo
    postBusniessBannerImages(banner_imgs_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-order', banner_imgs_obj, { headers: header }).map(res => res.json());
    }
    // Get all categories
    getCategories() {
      return this.http.get('http://localhost:3000/vendor/get-all-categories').map(res => res.json());
    }
    // Get All Categories
    getSubCategoriesOfCat(cat_id) {
      return this.http.get('http://localhost:3000/vendor/get-sub-cats-of-cat/' + cat_id).map(res => res.json());
    }
    // Get total business visits
    getTotalBusinessVisits(b_id) {
      return this.http.get('http://localhost:3000/vendor/get-total-business-visits/' + b_id).map(res => res.json());
    }

    // Get total business orders
    getTotalBusinessOrders(b_id) {
      return this.http.get('http://localhost:3000/vendor/get-total-business-orders/' + b_id).map(res => res.json());
    }

    // Get total business orders
    getTotalNumberOfItemsOfBusiness(b_id) {
      return this.http.get('http://localhost:3000/vendor/get-number-of-items-of-business/' + b_id).map(res => res.json());
    }

    // Get lists of business
    getListsOfBusiness(b_id) {
      return this.http.get('http://localhost:3000/vendor/get-lists-of-business/' + b_id).map(res => res.json());
    }

    // Get lists of business
    getItemsOfBusiness(b_id) {
      return this.http.get('http://localhost:3000/vendor/get-items-of-business/' + b_id).map(res => res.json());
    }

    // Add item to business
    addItemToBusiness(item_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-item', item_obj, { headers: header }).map(res => res.json());
    }
    addListToBusiness(list_obj) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      // tslint:disable-next-line:max-line-length
      return this.http.post('http://localhost:3000/vendor/post-list', list_obj, { headers: header }).map(res => res.json());
    }
    getListDetails(list_id) {
      return this.http.get('http://localhost:3000/vendor/get-list-details/' + list_id).map(res => res.json());
    }
    getListItems(list_id) {
      return this.http.get('http://localhost:3000/vendor/get-items-of-list/' + list_id).map(res => res.json());
    }

    getNotification(list_id) {
      return this.http.get('http://localhost:3000/vendor/get-notification/' + list_id).map(res => res.json());
    }
    confirmation(data){
      return this.http.put('http://localhost:3000/vendor/confirmation/', data).map(res => res.json());
    }
}

