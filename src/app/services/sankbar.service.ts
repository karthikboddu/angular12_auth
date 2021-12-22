import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SankbarService {

  constructor(private snackBar: MatSnackBar) { }


  showSnackbarDuration(content:any, action:any, duration:any) {
    this.snackBar.open(content, action, duration);
  }

  showSnackbarCssStyles(content:any, action:any, duration:any) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  showSnackbarTopPosition(content:any, action:any, duration:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }


}
