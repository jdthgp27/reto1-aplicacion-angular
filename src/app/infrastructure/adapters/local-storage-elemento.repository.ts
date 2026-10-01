/**
 * ============================================================
 *  INFRAESTRUCTURA: Adaptador de repositorio con localStorage
 * ============================================================
 */

import { Injectable } from '@angular/core';
import { Elemento } from '../../domain/models/elemento.model';
import { ElementoRepository } from '../../domain/ports/elemento.repository';

@Injectable()
export class LocalStorageElementoRepository implements ElementoRepository {
  private readonly CLAVE = 'reto1.elementos';

  async obtenerTodos(): Promise<Elemento[]> {
    const raw = localStorage.getItem(this.CLAVE);
    if (!raw) return [];

    try {
      const parseados = JSON.parse(raw) as Array<
        Omit<Elemento, 'creadoEn'> & { creadoEn: string }
      >;

      return parseados.map((e) => ({
        ...e,
        creadoEn: new Date(e.creadoEn),
      }));
    } catch (error) {
      console.error('Error al parsear elementos de localStorage:', error);
      return [];
    }
  }

  async guardar(elemento: Elemento): Promise<void> {
    const actuales = await this.obtenerTodos();
    const nuevos = [...actuales, elemento];
    localStorage.setItem(this.CLAVE, JSON.stringify(nuevos));
  }

  async eliminar(id: string): Promise<void> {
    const actuales = await this.obtenerTodos();
    const filtrados = actuales.filter((e) => e.id !== id);
    localStorage.setItem(this.CLAVE, JSON.stringify(filtrados));
  }
}
