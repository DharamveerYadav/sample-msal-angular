// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Azure active directory
  auth: {
    clientId: '028b61b3-6b0a-45f7-aad4-b351413b9a2f',
    groupId: 'f75917d2-8bfa-4892-8acd-a171669dc42a',
    authority: 'https://login.microsoftonline.com/2ffc2ede-4d44-4994-8082-487341fa43fb/',
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
