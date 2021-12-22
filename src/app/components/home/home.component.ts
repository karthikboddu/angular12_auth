import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService : AuthenticateService) { }
  pullreq : any;
  diffstatUrl ='';
  ngOnInit(): void {
    console.log(this.authService.currentUserValue)
    //        this.authService.getPullReq().subscribe(res=>{
    //         console.log(res);
    //         if(res){
		// this.pullreq = res.values;
    //         }
    //        });
  }

  sendData(links:any){
    this.diffstatUrl = links;
    console.log(this.diffstatUrl)
  } 

}
