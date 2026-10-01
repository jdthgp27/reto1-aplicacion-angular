/**
 * ============================================================
 *  APLICACION: Caso de uso - Listar elementos
 * ============================================================
 */

import { Inject, Injectable } from '@angular/core';
import { Elemento } from '../models/elemento.model';
import { ELEMENTO_REPOSITORY, ElementoRepository } from '../ports/elemento.repository';

@Injectable({ providedIn: 'root' })
export class ListarElementosUseCase {
  constructor(
    @Inject(ELEMENTO_REPOSITORY)
    private readonly repository: ElementoRepository
  ) {}

  ejecutar(): Promise<Elemento[]> {
    return this.repository.obtenerTodos();
  }
}
