import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaSecretaPage } from './pregunta-secreta.page';

describe('PreguntaSecretaPage', () => {
  let component: PreguntaSecretaPage;
  let fixture: ComponentFixture<PreguntaSecretaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreguntaSecretaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
