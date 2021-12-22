import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { SankbarService } from 'src/app/services/sankbar.service';

@Component({
  selector: 'app-header-items',
  templateUrl: './header-items.component.html',
  styleUrls: ['./header-items.component.scss']
})
export class HeaderItemsComponent implements OnInit {
  isLoggedIn =false;
  constructor(private router:Router,private authService: AuthenticateService,private snackbarSerivce:SankbarService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUserValue,"$$$$")
    this.isLoggedIn = this.authService.currentUserValue;
  }
  onTabClick(tab: any) {
    this.router.navigate([tab.link]);
  }
  public isActive(url: string) {
  //TODO: This is wrong use Page_names from appconstants
  return window.location.pathname.toLowerCase().startsWith(url.toLowerCase());
  }

  logout(){
    
    this.authService.logout().subscribe((res:any)=>{
      localStorage.removeItem('userToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['register']);
    },
    error => {
      //this.error = error;
      let time:any = '5000';
      this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);

    })

  }
}
