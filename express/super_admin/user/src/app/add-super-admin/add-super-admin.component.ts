import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-super-admin',
  templateUrl: './add-super-admin.component.html',
  styleUrls: ['./add-super-admin.component.css']
})
export class AddSuperAdminComponent implements OnInit {

  constructor(private validate: ValidateService, private adminService: AdminService) { }
  email;
  password;
  admins;
  // Page checks
  vendor_page_check = false;
  business_page_check = false;
  users_page_check= false;
  orders_page_check= false;
  main_menu_page_check= false;
  add_categories_page_check= false;
  add_sub_categories_page_check= false;
  edit_categories_page_check= false;
  cms_page_check= false;
  emp_page_check= false;
  delivery_tracking_page_check= false;
  add_super_admin_page_check= false;
  add_sub_admin_page_check= false;
  out = '';

  ngOnInit() {
    // Get all admins
    this.adminService.getAllAdmins().subscribe(ad => {
      if (ad.success) {
        this.admins = ad.msg;
      }else {
        alert('Something went wrong');
      }
    });
  }
  addSuperAdminClicked() {
    // if(this.validate.validateEmail(this.email))
    alert(this.vendor_page_check);
    if (this.validate.validateInput(this.email) && this.validate.validateInput(this.password)) {
      // Validate email
      if (this.validate.validateEmail(this.email)) {
        // getting permissions
        const admin = {
          email: this.email,
          password: this.password,
          vendors_page: this.vendor_page_check,
          business_page: this.business_page_check,
          users_page: this.users_page_check,
          orders_page: this.orders_page_check,
          main_menu_page: this.main_menu_page_check,
          add_categories_page: this.add_categories_page_check,
          add_subs_page: this.add_sub_categories_page_check,
          edit_cats_page: this.edit_categories_page_check,
          cms_page: this.cms_page_check,
          emp_page: this.emp_page_check,
          delivery_tracking_page: this.delivery_tracking_page_check,
          add_super_admin_page: this.add_super_admin_page_check,
          add_sub_admin: this.add_sub_admin_page_check
        };
        // post admin
        this.adminService.addAdmin(admin).subscribe(add => {
          if (add.success) {
            this.out = 'Added !';
            setTimeout(() => {
              this.out = '';
            }, 1000);
          }else {
            alert('Something went wrong');
          }
        });
      }else {
        alert('Proper email is required');
      }
    }
  }

}
