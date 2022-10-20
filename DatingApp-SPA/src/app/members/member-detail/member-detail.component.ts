import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user!: User;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private userService: UserService, private alertiryService: AlertifyService, private route:ActivatedRoute) { }

  ngOnInit() {
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log("user",this.user);
    });

    this.galleryOptions = [
    {
      width: '600px',
      height: '400px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },
    //max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    //max-width 400
    {
      breakpoint: 400,
      preview: false
    }
    ];

    this.galleryImages = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    for(let i = 0; i < this.user.photos?.length; i++){
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }

  // loadUser(){
  //   this.userService.getUser(this.route.snapshot.params["id"]).subscribe(
  //     next=>{
  //       this.user = next;
  //     },
  //     error =>{this.alertiryService.error(error);}
  //   );
  // }

}
