import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  user_id;
  user_name;
  user_email;
  user_mobile;
  user_reg_time;
  user_last_login;
  user_paused_status;
  user_approve_status;

  ngOnInit() {
    // Get user details
    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.user_id = params['id'];
      // Get user from id
      this.adminService.getUserById(this.user_id).subscribe(user => {
        console.log(user);
        if (user.success) {
          // Display user
          this.user_name = user.msg[0].name;
          this.user_email = user.msg[0].email;
          this.user_mobile = user.msg[0].mobile;
          this.user_reg_time = user.msg[0].registered_time;
          this.user_last_login = user.msg[0].last_login_time;
        }else {
          // error
          alert('Something went wrong');
        }
      });
    });

    // Get user reviews
  }
  cancelPauseClicked() {
    $('.db').hide();
    $('.wb').hide();
  }
  sendMessageToUserClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.msg-wb').css({ 'display': 'flex' });
  }
  pauseUserClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.pause-wb').css({ 'display': 'flex' });
  }
  deleteUserClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.delete-wb').css({ 'display': 'flex' });
  }

}
