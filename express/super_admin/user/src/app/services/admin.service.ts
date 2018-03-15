import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AdminService {
    authToken: any;
    user: any;
    constructor(private http: Http) { }
    // authenticateEmail(email: string) {
    //   return this.http.get('http://localhost:3000/admin/find-email/' + email).map(res => res.json());
    // }

    // updatePassword(pwd) {
    //     const header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     return this.http.post('http://localhost:3000/admin/update-pwd', pwd, { headers: header }).map(res => res.json());
    // }

    // CMS
    // Get Terms
    // Get terms for terms and conditions page
    getTerms() {
        // return this.http.get('http://localhost:3000/admin/get-terms').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-terms').map(res => res.json());
      }
    // Post terms
    PostTerms(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/post-terms', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/post-terms', data, { headers: header }).map(res => res.json());
    }

    PostPrivacy(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/post-privacy', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/post-privacy', data, { headers: header }).map(res => res.json());
    }
    PostVendorPolicy(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/post-vendor-policy', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/post-vendor-policy', data, { headers: header }).map(res => res.json());
    }
    PostAbout(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/post-about', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/post-about', data, { headers: header }).map(res => res.json());
    }
    PostCareersCMS(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/post-careers-cms', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/post-careers-cms', data, { headers: header }).map(res => res.json());
    }
    getTotalSiteVisits() {
        // return this.http.get('http://localhost:3000/admin/get-total-visits').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-total-visits').map(res => res.json());
    }
    // Get All Categories
    getCategories() {
        // return this.http.get('http://localhost:3000/admin/get-all-categories').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-all-categories').map(res => res.json());
    }
    // Get All Users
    getAllBusniesses() {
        // return this.http.get('http://localhost:3000/admin/get-all-businesses').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-all-businesses').map(res => res.json());
    }

    // Get Business By Id
    getBusniessById(id) {
        // return this.http.get('http://localhost:3000/admin/get-business-by-id/' + id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-business-by-id/' + id).map(res => res.json());
    }
    // Get BUsiness By type
    getBusniessByType(type) {
        // return this.http.get('http://localhost:3000/admin/get-business-by-type/' + type).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-business-by-type/' + type).map(res => res.json());
    }
    // Get BUsiness By plan
    getBusniessByPlan(type) {
        // return this.http.get('http://localhost:3000/admin/get-business-by-plan/' + type).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-business-by-plan/' + type).map(res => res.json());
    }
    // Get All Users
    getAllUsers() {
        // return this.http.get('http://localhost:3000/admin/get-all-users').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-all-users').map(res => res.json());
    }
    // Get All Users
    getAllVendors() {
        // return this.http.get('http://localhost:3000/admin/get-all-vendors').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-all-vendors').map(res => res.json());
    }
    // Get All Admins
    getAllAdmins() {
        // return this.http.get('http://localhost:3000/admin/get-all-admins').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-all-admins').map(res => res.json());
    }
    // Get All Categories
    getSubCategoriesOfCat(cat_id) {
        // return this.http.get('http://localhost:3000/admin/get-sub-cats-of-cat/' + cat_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-sub-cats-of-cat/' + cat_id).map(res => res.json());
    }
    // Add category
    AddCategory(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/add-category', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/add-category', data, { headers: header }).map(res => res.json());
    }
    // Delete category
    DeleteCategory(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/delete-category', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/delete-category', data, { headers: header }).map(res => res.json());
    }

    // Add sub category
    AddSubCategory(data) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/add-sub-category', data, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/add-sub-category', data, { headers: header }).map(res => res.json());
    }
    // Get total number of admin
    GetTotalNumberOfUsers() {
        // return this.http.get('http://localhost:3000/admin/get-num-of-users').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-num-of-users').map(res => res.json());
    }
    // Get total number of admin
    GetTotalNumberOfVendors() {
        // return this.http.get('http://localhost:3000/admin/get-num-of-vendors').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-num-of-vendors').map(res => res.json());
    }
    // Get total number of admin
    GetTotalNumberOfBusinesses() {
        // return this.http.get('http://localhost:3000/admin/get-num-of-buses').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-num-of-buses').map(res => res.json());
    }
    // Get Main categories
    getMainCats() {
        // return this.http.get('http://localhost:3000/admin/get-main-cats').map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-main-cats').map(res => res.json());
    }
    // Get vendors that belong to a sub cateogry
    getVendorOfSubCategory(sub_id) {
        // return this.http.get('http://localhost:3000/admin/get-vendor-by-sub/' + sub_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-vendor-by-sub/' + sub_id).map(res => res.json());
    }
    getVendorById(id) {
        // return this.http.get('http://localhost:3000/admin/get-vendor-by-id/' + id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-vendor-by-id/' + id).map(res => res.json());
    }
    getUserById(id) {
        // return this.http.get('http://localhost:3000/admin/get-user-by-id/' + id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-user-by-id/' + id).map(res => res.json());
    }
    editCategory(cat_obj) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/edit-category', cat_obj, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/edit-category', cat_obj, { headers: header }).map(res => res.json());
    }
    // Add Admin
    addAdmin(admin) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('http://localhost:3000/admin/add-admin', admin, { headers: header }).map(res => res.json());
        return this.http.post('https://api.reatchall.com/admin/add-admin', admin, { headers: header }).map(res => res.json());
    }
    // Get admin
    getAdmin(id) {
        // return this.http.get('http://localhost:3000/admin/get-admin/' + id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/get-admin/' + id).map(res => res.json());
    }
    pauseBusiness(b_id) {
        // return this.http.get('http://localhost:3000/admin/pause-business/' + b_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/pause-business/' + b_id).map(res => res.json());
    }
    // Pause vendor
    pauseVendor(v_id) {
        // return this.http.get('http://localhost:3000/admin/pause-vendor/' + v_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/pause-vendor/' + v_id).map(res => res.json());
    }
    // Add featured Businesses
    addFeaturedBusinesses(b_id) {
        // return this.http.get('http://localhost:3000/admin/add-featured/' + b_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/add-featured/' + b_id).map(res => res.json());
    }
    removeFeaturedBusinesses(b_id) {
        // return this.http.get('http://localhost:3000/admin/remove-featured/' + b_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/remove-featured/' + b_id).map(res => res.json());
    }
    // Check if featured business
    checkIfFeatured(b_id) {
        // return this.http.get('http://localhost:3000/admin/check-if-featured/' + b_id).map(res => res.json());
        return this.http.get('https://api.reatchall.com/admin/check-if-featured/' + b_id).map(res => res.json());
    }
}

