import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import {AesService} from '../../services/aes.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginInvalid = false;
  form: FormGroup;
  returnUrl: string ='';
  tokenFromUI: string = "0123456789123456";

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,    private authService: AuthenticateService, private aesService:AesService,
    private router: Router) { this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });}

  ngOnInit(): void {
    this.returnUrl = 'home';
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    //this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        
         this.authService.login(username, this.aesService.encryptUsingAES256(password)).subscribe(res=>{
          console.log(res);
          if(res){
            this.router.navigate([this.returnUrl]);
          }
         });
      } catch (err) {
        console.log("sdfsdfds")
        this.loginInvalid = true;
      }
    } else {
      //this.formSubmitAttempt = true;
    }
  }

  

}