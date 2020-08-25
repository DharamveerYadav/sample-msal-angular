// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Azure active directory
  auth: {
    clientId: '*****',
    groupId: '****', // For group authorization
    authority: 'https://login.microsoftonline.com/${tenantID}/',
    postLogoutRedirectUri: '',
    consentScopes: ['offline_access', 'User.Read', 'User.ReadWrite'],
  },
  graph: {
    profile: 'https://graph.microsoft.com/v1.0/me',
    groups: 'https://graph.microsoft.com/v1.0/me/memberOf',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
