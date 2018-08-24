import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';


@Injectable()
export class AuthService {

  constructor(
    private afService: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.afService.auth.signInWithEmailAndPassword(email, password);
  }
  checkAuth() {
    return this.afService.authState.map(auth => auth);
  }
  logOut() {
    return this.afService.auth.signOut();
  }
  register(email: string, password: string) {
    return this.afService.auth.createUserWithEmailAndPassword(email, password);
}

}
