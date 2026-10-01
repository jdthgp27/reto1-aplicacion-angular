/**
 * ============================================================
 *  DOMINIO: Modelo de Elemento
 * ============================================================
 *  Representa una entidad de negocio pura.
 *  - NO depende de Angular.
 *  - NO depende de librerias externas.
 * ============================================================
 */

export interface Elemento {
  readonly id: string;
  readonly nombre: string;
  readonly creadoEn: Date;
}

/**
 * Factory de creacion de elementos.
 * Centraliza las reglas de negocio para construir un Elemento valido.
 */
export const crearElemento = (nombre: string): Elemento => {
  const nombreLimpio = nombre?.trim() ?? '';

  if (nombreLimpio.length === 0) {
    throw new Error('El nombre del elemento no puede estar vacio');
  }

  if (nombreLimpio.length > 100) {
    throw new Error('El nombre del elemento no puede superar los 100 caracteres');
  }

  return {
    id: crypto.randomUUID(),
    nombre: nombreLimpio,
    creadoEn: new Date(),
  };
};
