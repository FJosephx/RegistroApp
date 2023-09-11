import { Persona } from './persona';

export class Usuario extends Persona {
  constructor(
    nombre: string,
    apellido: string,
    public correo: string,
    public contrasena: string,
    public preguntaSecreta: string,
    public respuestaCorrecta: string,
    public respuestaIncorrecta: string
  ) {
    super(nombre, apellido);
  }
}
