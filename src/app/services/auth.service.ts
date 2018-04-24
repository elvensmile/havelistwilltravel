import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  redirectUrl: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('Error:', err.message);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => {
        if (this.router.url.startsWith('/profile') || this.router.url.startsWith('/trip')) {
          this.router.navigate(['/']);
        }
      });

  }

  getUser(): Observable<firebase.User> {
    return this.user;
  }

}
