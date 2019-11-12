import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    private _auth: AuthService,
    private error: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  criarNovoAccessToken() {
    return this.auth.obterNovoAccessToken();
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.error.handle(erro));
  }

  public get auth(): AuthService {
    return this._auth;
  }
  public set auth(value: AuthService) {
    this._auth = value;
  }

}
