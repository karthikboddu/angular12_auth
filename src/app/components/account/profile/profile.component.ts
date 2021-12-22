import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserLogin } from 'src/app/models/UserLogin.model';
import { SankbarService } from 'src/app/services/sankbar.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

  constructor(private authService : AuthenticateService,private userService: UserService,private snackbarSerivce:SankbarService) { }
  element : any;
  public displayedColumns = [ 'device', 'loggedinAt', 'loggedoutAt','ipAddress', 'islogout'  ];

  public dataSource = new MatTableDataSource<UserLogin>();
  ngOnInit(): void {

    this.userService.getUserLoginInfo().subscribe((res:any)=>{
      console.log(res)
      this.dataSource.data = res as UserLogin[];
      console.log(this.dataSource.data)
    },
    error => {
      //this.error = error;
      let time:any = '5000';
      this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);

    })

    this.userService.getUserLoginInfo().pipe(map(user => {

    }));

  }



}
