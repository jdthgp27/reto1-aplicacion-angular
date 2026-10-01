/**
 * ============================================================
 *  INFRAESTRUCTURA: Componente de UI - Lista de Elementos
 * ============================================================
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Elemento } from '../../../domain/models/elemento.model';
import { ListarElementosUseCase } from '../../../domain/use-cases/listar-elementos.use-case';
import { AgregarElementoUseCase } from '../../../domain/use-cases/agregar-elemento.use-case';
import { EliminarElementoUseCase } from '../../../domain/use-cases/eliminar-elemento.use-case';

@Component({
  selector: 'app-lista-elementos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-elementos.html',
  styleUrl: './lista-elementos.css',
})
export class ListaElementosComponent implements OnInit {
  private readonly listarUC = inject(ListarElementosUseCase);
  private readonly agregarUC = inject(AgregarElementoUseCase);
  private readonly eliminarUC = inject(EliminarElementoUseCase);

  readonly elementos = signal<Elemento[]>([]);
  readonly nuevoNombre = signal<string>('');
  readonly cargando = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.cargarElementos();
  }

  private async cargarElementos(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);

    try {
      const data = await this.listarUC.ejecutar();
      this.elementos.set(data);
    } catch (e) {
      this.error.set('Error al cargar los elementos');
      console.error(e);
    } finally {
      this.cargando.set(false);
    }
  }

  async agregar(): Promise<void> {
    const nombre = this.nuevoNombre().trim();
    if (!nombre) return;

    try {
      await this.agregarUC.ejecutar(nombre);
      this.nuevoNombre.set('');
      await this.cargarElementos();
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }

  async eliminar(id: string): Promise<void> {
    try {
      await this.eliminarUC.ejecutar(id);
      await this.cargarElementos();
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }

  trackById(_: number, item: Elemento): string {
    return item.id;
  }
}
