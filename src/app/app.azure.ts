import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/', ['User.Read', 'User.ReadWrite']],
];

export function redirectUri() {
  return `${window.location.protocol}//${window.location.host}/`;
}
export const AZURE_MODULES = [
  MsalModule.forRoot(
    {
      auth: {
        clientId: environment.auth.clientId,
        authority: environment.auth.authority, // indicates a directory that MSAL can request tokens from
        validateAuthority: true,
        postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
        navigateToLoginRequestUrl: false,
        redirectUri,
      },
      cache: {
        cacheLocation: 'localStorage', // to support SSO local storage is recommended
        storeAuthStateInCookie: isIE, // IE may clear local storage when navigating between websites in different zones (e.g. your app and the login authority), which results in a broken experience when returning from the login page. To fix, set storeAuthStateInCookie to true.
      },
    },
    {
      consentScopes: environment.auth.consentScopes,
      unprotectedResources: ['https://www.microsoft.com/en-us/'],
      protectedResourceMap,
      extraQueryParameters: {},
    },
  ),
];

// MsalInterceptor will obtain tokens and add them to all
// your Http requests in API calls except the API endpoints listed as unprotectedResources
export const AZURE_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
];
