import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContraseniaIncorrectaPage } from './contrasenia-incorrecta.page';

describe('ContraseniaIncorrectaPage', () => {
  let component: ContraseniaIncorrectaPage;
  let fixture: ComponentFixture<ContraseniaIncorrectaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContraseniaIncorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
