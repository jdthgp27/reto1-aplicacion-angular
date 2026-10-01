/**
 * ============================================================
 *  APLICACION: Caso de uso - Eliminar elemento
 * ============================================================
 */

import { Inject, Injectable } from '@angular/core';
import { ELEMENTO_REPOSITORY, ElementoRepository } from '../ports/elemento.repository';

@Injectable({ providedIn: 'root' })
export class EliminarElementoUseCase {
  constructor(
    @Inject(ELEMENTO_REPOSITORY)
    private readonly repository: ElementoRepository
  ) {}

  ejecutar(id: string): Promise<void> {
    if (!id) {
      throw new Error('El ID es obligatorio para eliminar');
    }
    return this.repository.eliminar(id);
  }
}
