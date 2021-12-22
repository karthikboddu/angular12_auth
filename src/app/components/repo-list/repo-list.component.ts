import { Component, OnInit,Input } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  constructor(private authService : AuthenticateService) { }

  ngOnInit(): void {
  }
  files: any;
  urlDiff ='';
  downloadProgress=false;
 blob ='';
  @Input()
  set diffstat(url:any){
	this.urlDiff = url;
    console.log(url)
    this.authService.getDiffStartFileUrl(url).subscribe((res:any)=>{
      console.log(res,"files")
      this.files = res.values;
    });

  }

  generate(diffurl:any){
	console.log(diffurl)
	this.downloadProgress= true;	
	this.authService.generateTar(diffurl,'').subscribe((res:any)=>{
	if(res.status==1){
	this.downloadProgress= false;
	}
      	console.log(res.data,"files")
	saveAs(res.data, 'test.tar.gz');
    	});
  }
}
