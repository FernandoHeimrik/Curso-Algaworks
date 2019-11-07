import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { CategoriaService } from '../categorias/categoria.service';
import { JwtModule } from '@auth0/angular-jwt';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    AuthService,

    ConfirmationService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService
  ]
})
export class CoreModule { }
