/**
 * ============================================================
 *  DOMINIO: Puerto del repositorio de Elementos
 * ============================================================
 *  Define el CONTRATO de persistencia.
 * ============================================================
 */

import { Elemento } from '../models/elemento.model';

export interface ElementoRepository {
  obtenerTodos(): Promise<Elemento[]>;
  guardar(elemento: Elemento): Promise<void>;
  eliminar(id: string): Promise<void>;
}

/**
 * Token de inyeccion de dependencias.
 */
export const ELEMENTO_REPOSITORY = Symbol('ElementoRepository');
