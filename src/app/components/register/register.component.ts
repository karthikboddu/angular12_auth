import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AesService } from 'src/app/services/aes.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError } from 'rxjs/operators';
import { SankbarService } from 'src/app/services/sankbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginform: FormGroup;
  registerform : FormGroup;
  returnUrl: string ='';
  tokenFromUI: string = "0123456789123456";
  selectedTab : string ='0';
  showLoginTab = true;
  showRegisterTab = false;
  showForgotPassTab = false;
  onLoginSubmitLoading =  false;
  recentUsers : any;
  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,    private authService: AuthenticateService, private aesService:AesService,
    private router: Router,private userService: UserService,private snackBar: MatSnackBar,private snackbarSerivce: SankbarService) { 
      this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  
    }

    ngOnInit(): void {
      this.returnUrl = 'home';
      if(this.authService.currentUserValue){
        this.router.navigate(["home"]);
      }else{
        this.userService.getPreUserLoginInfo().subscribe((res:any)=>{
          console.log(res)
          this.showLoginTab = false; 
          this.recentUsers = res;
        },
        error => {
          //this.error = error;
          let time:any = '5000';
          this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);
          this.onLoginSubmitLoading = false;
        }
        )
      }
    }

    async onSubmitLogin(myLoginform:any): Promise<void> {
      this.onLoginSubmitLoading = true;
      //this.loginInvalid = false;
      //this.formSubmitAttempt = false;
      if (myLoginform.status=='VALID') {
        try {
          
          const username = myLoginform.value.username;
          const password = myLoginform.value.password;
//         this.aesService.encryptUsingAES256(password)
          
           this.authService.login(username, password).subscribe(res=>{
             console.log(res);
            if(res.status){
              localStorage.setItem('userToken', res.accessToken);
              localStorage.setItem("refreshToken",res.refreshToken);
              this.onLoginSubmitLoading = false;
              this.authService.userAutoLogout(3600000);
              this.router.navigate([this.returnUrl]);
            }
           },
           error => {
            //this.error = error;
            let time:any = '5000';
            this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);
            this.onLoginSubmitLoading = false;
          }
           );
        } catch (err) {
          this.onLoginSubmitLoading = false;
          //console.log(err,"ER");
          
          //this.loginInvalid = true;
        }
      } else {
        //this.formSubmitAttempt = true;
      }
    }
    
    async register(myform:any): Promise<void> {

      console.log(JSON.stringify(myform.value))
      //let userData = JSON.stringify(myform.value);
      this.onLoginSubmitLoading = true;
      if(myform.status=='VALID'){
        try {
        
           this.authService.userRegister(myform.value).subscribe(res=>{
            console.log(res);
            if(res){
              this.onLoginSubmitLoading = false;
              this.router.navigate([this.returnUrl]);
            }
           },
           error => {
            //this.error = error;
            let time:any = '5000';
            this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);
            this.onLoginSubmitLoading = false;
          }
           
           );
        } catch (err) {
          this.onLoginSubmitLoading = false;

          //this.loginInvalid = true;
        }
      }
    }
    
    async forgotpass(myform:any): Promise<void> {
      console.log(myform.value)
      this.onLoginSubmitLoading = true;
      if(myform.status=='VALID'){
        try {
        
           this.authService.requestResetPassword(myform.value.email).subscribe(res=>{
            console.log(res);
            if(res){

              this.onLoginSubmitLoading = false;
              //this.router.navigate([this.returnUrl]);
            }
           },
           error => {
            //this.error = error;
            let time:any = '5000';
            this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);
            this.onLoginSubmitLoading = false;
          }
           );
        } catch (err) {
          this.onLoginSubmitLoading = false;

          //this.loginInvalid = true;
        }
      }

    }


    selectTab(tab:any){

      if(tab=="1"){
        this.showForgotPassTab = false;
        this.showLoginTab = false; 
        this.showRegisterTab = true;
        this.selectedTab = tab; 
      }else if(tab=="2"){
        this.showForgotPassTab = true;
        this.showLoginTab = false; 
        this.selectedTab = tab; 
      }else{
        this.showForgotPassTab = false;
        this.showRegisterTab = false;
        this.showLoginTab = true;   
        this.selectedTab = tab;
      }

    }

    resolved(captchaResponse: string) {
      console.log(`Resolved response token: ${captchaResponse}`);
     
    }
    
    reAuth(){
      this.authService.reAuthencticate().subscribe((res:any)=>{
        console.log(res)
        localStorage.setItem('userToken', res.accessToken);
        localStorage.setItem("refreshToken",res.refreshToken);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        //this.error = error;
        let time:any = '5000';
        this.snackbarSerivce.showSnackbarCssStyles(error.message,'ERROR',time);
        this.onLoginSubmitLoading = false;
      }
      )
    }
}
