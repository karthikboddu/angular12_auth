import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef,OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../../account/profile/profile.component';
import { HomeComponent } from '../../home/home.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @ViewChild('pageLayout', { read: ViewContainerRef }) pageLayout: ViewContainerRef;
  component : any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,private ref: ChangeDetectorRef) {

      setInterval(() => {
        this.ref.detectChanges();
      }, 1);
      // let pageName = this.getPageName();
      // this.component =  this.loadComponent(pageName);
      // console.log(this.component ,"page")
      // this.createComponent(this.component);
     }

  ngOnInit(): void {

  }
    
  ngAfterViewInit(){
    this.layoutLoad();
  }
  layoutLoad(){
    let pageName = this.getPageName();
    this.component =  this.loadComponent(pageName);
    this.createComponent(this.component);
  }

  loadComponent(pageName:any){
    console.log(pageName)
    if(pageName == 'home'){
      this.component = HomeComponent
    }else if(pageName == 'login'){
      this.component = LoginComponent;
    }else if(pageName =='register'){
      this.component = RegisterComponent;
    }else if(pageName =='profile'){
      this.component = ProfileComponent;
    }
    return this.component;
  }


  createComponent(component:any){
    //console.log(component)
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.pageLayout.clear();
    const componentRef = this.pageLayout.createComponent(factory);
  }

  getPageName(): string {
    let pageName = this.route.snapshot.data["pageName"];

    if (!pageName || pageName == '') {
      throw Error("No pageName provided to PageContainerComponent");
    }

    return pageName;
  }

}
