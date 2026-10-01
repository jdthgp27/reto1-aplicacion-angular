/**
 * ============================================================
 *  APLICACION: Caso de uso - Agregar elemento
 * ============================================================
 */

import { Inject, Injectable } from '@angular/core';
import { Elemento, crearElemento } from '../models/elemento.model';
import { ELEMENTO_REPOSITORY, ElementoRepository } from '../ports/elemento.repository';

@Injectable({ providedIn: 'root' })
export class AgregarElementoUseCase {
  constructor(
    @Inject(ELEMENTO_REPOSITORY)
    private readonly repository: ElementoRepository
  ) {}

  async ejecutar(nombre: string): Promise<Elemento> {
    const elemento = crearElemento(nombre);
    await this.repository.guardar(elemento);
    return elemento;
  }
}
