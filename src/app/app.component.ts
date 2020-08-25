import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public authService: AuthService){}
  title = 'sample-msal';
  loggedInProfile;

  async ngOnInit() {
    await this.authService.loginInit();
    // will be call while acquiring token silently. 
    if (this.authService.loggedIn) {
      this.loggedInProfile = await this.authService.getUserProfile();
    }
  }
}
