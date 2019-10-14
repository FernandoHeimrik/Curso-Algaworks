import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa.component';

describe('LancamentosPesquisaComponent', () => {
  let component: LancamentosPesquisaComponent;
  let fixture: ComponentFixture<LancamentosPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentosPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
