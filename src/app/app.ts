/**
 * ============================================================
 *  Componente raíz: solo monta el componente principal.
 * ============================================================
 */

import { Component } from '@angular/core';
import { ListaElementosComponent } from './infrastructure/components/lista-elementos/lista-elementos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaElementosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}