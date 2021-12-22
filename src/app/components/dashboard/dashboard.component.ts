import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  members: {title: string, subtitle: string, content: string, url: string, link:string}[] = [
    {title: 'Title', subtitle: 'Subtitle', content: 'My Profile', url: 'http://127hack.com/assets/images/boy.png',link:'my-profile'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Seat Bookings', url: 'http://127hack.com/assets/images/office-desk.png',link:'seat-booking'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Attendance', url: 'http://127hack.com/assets/images/accept.png',link:'attendance'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Book Meal', url: 'http://127hack.com/assets/images/meal.png',link:'book-meal'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Coffee', url: 'http://127hack.com/assets/images/coffee-maker.png',link:'coffee-booking'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Updates', url: 'http://127hack.com/assets/images/office-desk.png',link:'updates'},
    {title: 'Title', subtitle: 'Subtitle', content: 'My Awards', url: 'http://127hack.com/assets/images/awards.png',link:'my-awards'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Employees', url: 'http://127hack.com/assets/images/team.png',link:'employees'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Help Desk', url: 'http://127hack.com/assets/images/desk.png',link:'help-desk'}
    
  ];
  onTabClick(tab: any) {
    console.log("tab",tab)
    this.router.navigate([tab.link]);
  }


}
