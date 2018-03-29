import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  business: any = [];
  constructor(private route: ActivatedRoute, private title: Title, private userService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log(params.sub_id);

      this.userService.getBusinessBySubCategorie(params.sub_id).subscribe((res)=>{
        console.log(res);
        if(res.success){
          this.business = res.msg
        } else {

        }
      })
    })
  }

}
