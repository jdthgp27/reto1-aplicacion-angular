# Reflexión — Reto 1: Aplicación Angular con arquitectura hexagonal

## 🎯 Objetivo del reto

Crear una aplicación Angular que gestione una lista de elementos, aplicando
buenas prácticas de arquitectura **hexagonal (puertos y adaptadores)**,
código escalable, testeable y desacoplado.

---

## 🏗️ Decisiones de arquitectura

### 1. ¿Por qué arquitectura hexagonal?

La arquitectura hexagonal separa la lógica de negocio (dominio) de los
detalles de infraestructura (framework, persistencia, UI). Esto trae
ventajas clave:

- **Testeabilidad**: el dominio se puede probar sin Angular ni navegador.
- **Escalabilidad**: cambiar de localStorage a una API REST es cambiar
  un solo archivo.
- **Mantenibilidad**: cada capa tiene una responsabilidad clara.

### 2. Estructura del proyecto

```text
src/app/
├── domain/               ← ❤️ Corazón del negocio (sin dependencias)
│   ├── models/           → Entidades puras
│   ├── ports/            → Contratos (interfaces)
│   └── use-cases/        → Orquestación de la lógica
│
├── infrastructure/       ← 🔌 Detalles técnicos
│   ├── adapters/         → Implementaciones concretas de los puertos
│   └── components/       → UI (Angular)
│
└── app.config.ts         ← 🧩 Punto de unión (puerto ↔ adaptador)
```

### 3. Flujo de dependencias

```text
UI (componente) → Caso de uso → Puerto ← Adaptador
```

Las flechas apuntan **siempre hacia el dominio**. Nunca al revés.
Esto es la **regla de oro** de la arquitectura hexagonal.

---

## 🧩 Desafíos encontrados y soluciones

### Desafío 1: Angular 22 cambió los nombres de archivos

Angular 22 eliminó los sufijos `.component.ts`, `.component.html`, etc.
Ahora los archivos se llaman simplemente `app.ts`, `app.html`, `app.css`.

**Solución**: adaptar la estructura y nombres al nuevo estándar sin
perder la organización por capas.

### Desafío 2: Configuración zoneless por defecto

Angular 22 usa detección de cambios zoneless por defecto, lo que provocó
el error `NG0908: In this configuration Angular requires Zone.js`.

**Solución**: eliminar `provideZoneChangeDetection` y `provideZonelessChangeDetection`
del `app.config.ts`. Angular 22 lo maneja automáticamente.

**Aprendizaje**: los `signal()` que usamos en el componente son la clave
para que la detección de cambios funcione sin Zone.js.

### Desafío 3: Inyección de dependencias con tokens

El dominio no puede importar la clase concreta del repositorio porque eso
violaría la regla de dependencias.

**Solución**: usar un `Symbol` como token de inyección
(`ELEMENTO_REPOSITORY`) y hacer el binding en `app.config.ts`:

```typescript
{
  provide: ELEMENTO_REPOSITORY,
  useClass: LocalStorageElementoRepository,
}
```

### Desafío 4: Archivos vacíos que no eran módulos

Al crear los archivos con PowerShell (`New-Item -ItemType File`), estos
quedaban en 0 bytes. TypeScript lanzaba el error:
`File '...' is not a module`.

**Solución**: escribir el contenido de cada archivo con `Set-Content`.

### Desafío 5: Persistencia de fechas en localStorage

`JSON.stringify` convierte objetos `Date` en strings. Al recuperarlos,
dejaban de ser objetos `Date`.

**Solución**: en el adaptador, reconstruir las fechas con
`new Date(e.creadoEn)` al leer.

---

## ✅ Lo que aprendí

1. **Separación de responsabilidades**: cada capa hace una sola cosa.
2. **Inversión de dependencias**: el dominio define los contratos, la
   infraestructura los implementa.
3. **Angular moderno**: Signals, standalone components, zoneless.
4. **Escalabilidad real**: si mañana quiero conectar una API, solo
   escribo un nuevo adaptador sin tocar el dominio.
5. **PowerShell** como herramienta de automatización de tareas repetitivas.

---

## 🚀 Mejoras futuras

- [ ] Añadir adaptador HTTP con `HttpClient` y `json-server`.
- [ ] Añadir edición de elementos (nuevo caso de uso).
- [ ] Añadir tests unitarios con Vitest/Jest.
- [ ] Añadir estado global con Signals Store.
- [ ] Añadir rutas con `provideRouter` para múltiples vistas.
- [ ] Internacionalización (i18n).

---

## 📚 Referencias

- [Angular.dev — Arquitectura](https://angular.dev/guide/architecture)
- [Alistair Cockburn — Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Documentación oficial de Angular](https://angular.dev)

---

**Autor**: Judit Giravent  
**Fecha**: Octubre 2026  
**Curso**: Desarrollo Web con Frameworks 3