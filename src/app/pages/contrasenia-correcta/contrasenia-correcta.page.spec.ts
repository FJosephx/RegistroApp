import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContraseniaCorrectaPage } from './contrasenia-correcta.page';

describe('ContraseniaCorrectaPage', () => {
  let component: ContraseniaCorrectaPage;
  let fixture: ComponentFixture<ContraseniaCorrectaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContraseniaCorrectaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
