import { Injectable } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isIframe = false;
  public loggedIn = false; // user logged In status
  constructor(
    private router: Router,
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private http: HttpClient
  ) {}

  /**
   * Initialize login process
   *
   * @memberof AuthService
   */
  public async loginInit() {
    // Will not let redirect untill login popup is open
    this.isIframe = window !== window.parent && !window.opener;
    await this.checkoutAccount();
    this.broadcastService.subscribe('msal:loginSuccess', async () => {
      this.checkoutAccount();
      // Setting values for header and footer
    //  this.headerFooterService.loggedInProfile = await this.getUserProfile();
    
    });
    this.broadcastService.subscribe('msal:loginFailure', payload => {
      this.loggedIn = false;
      // @TODO need to implement error handling
    });
    this.broadcastService.subscribe('msal:acquireTokenSuccess', payload => {
      this.loggedIn = true;
    });

    this.broadcastService.subscribe('msal:acquireTokenFailure', payload => {
      if (payload.errorCode === 'login_required') {
        this.loggedIn = false;
        this.router.navigate(['/error']);
      }
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        this.loggedIn = false;
        // @TODO need to implement error handling
      }
    });
  }

  /**
   * get current logged in account details
   *
   * @memberof AuthService
   */
  async checkoutAccount() {
    this.loggedIn = await !!this.authService.getAccount();
    if (!this.loggedIn) {
      this.login();
    }
  }

  /**
   * Perform authentication and acquire id token
   *
   * @memberof AuthService
   */
  login() {
    const redirectURL = window.location.protocol + '//' + window.location.host + '/';
    this.authService.loginRedirect({
      scopes: environment.auth.consentScopes
    });
  }

  /**
   * WIll clear token from local storage
   *
   * @memberof AuthService
   */
  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }

  /**
   * Fetch profile details of logged in user
   *
   * @returns
   * @memberof AuthService
   */
  async getUserProfile() {
    return this.http
      .get(environment.graph.profile)
      .toPromise()
      .then(profile => {
        return profile;
      });
  }

  /**
   * Fetch all associated groups to logged in user
   *
   * @returns
   * @memberof AuthService
   */
  async getUserGroups() {
    return this.http
      .get(environment.graph.groups)
      .toPromise()
      .then(groups => {
        return groups;
      });
  }
}
