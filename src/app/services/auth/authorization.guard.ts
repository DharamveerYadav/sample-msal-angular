// import { AuthService } from './auth.service';
// import { CanActivate, Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizationGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   /**
//    * canActivate check user is authorized or not before redirect to page
//    *
//    * @returns
//    * @memberof AuthorizationGuard
//    */
//   async canActivate() {
//     try {
//       const groups: any = await this.authService.getUserGroups();
//       let authorizated = false;
//       groups.value.forEach(group => {
//         if (group.id === environment.auth.groupId) {
//           authorizated = true;
//         }
//       });
//       if (authorizated) {
//         return true;
//       } else {
//         this.router.navigate(['/dashboard/unauthorize']);
//         return false;
//       }
//     } catch (e) {
//       // @todo redirect to error page
//       return false;
//     }
//   }
// }
