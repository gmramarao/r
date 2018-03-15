import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private auth: AuthService, private adminService: AdminService) { }

  // admin
  admin_id;
  admin_email;

  vendor_check = true;
  business_check = true;
  users_check = true;
  cms_check = true;
  orders_check = true;
  main_menu_check = true;
  add_cat_check = true;
  add_sub_check = true;
  edit_cat_check = true;
  emi_check = true;
  employee_check = true;
  del_check = true;
  ads_check = true;
  search_check = true;
  add_admin_cehck = true;
  add_sub_admin_check = true;

  ngOnInit() {
    // Get admin from localstorage
    const admin_obj = JSON.parse(localStorage.getItem('user'));

    this.admin_id = admin_obj.id;
    this.adminService.getAdmin(this.admin_id).subscribe(ad => {
      if (ad.success) {
        console.log(ad.msg[0].permissions);
      } else {
        console.log(ad.msg);
        alert('Something went horribly wrong !');
      }
    });

    const acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }

}
