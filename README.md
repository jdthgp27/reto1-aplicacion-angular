# 📋 Lista de Elementos — Angular 22 + Arquitectura Hexagonal

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-10.x-CB3837?style=for-the-badge&logo=npm&logoColor=white)

Aplicación Angular que gestiona una lista de elementos con persistencia
en `localStorage`, aplicando **arquitectura hexagonal** (puertos y
adaptadores) para garantizar escalabilidad, testeabilidad y desacoplamiento.

---

## 🚀 Demo rápida

```bash
npm install
ng serve
```

Abre 👉 http://localhost:4200

---

## 🏗️ Arquitectura

```text
┌─────────────────────────────────────────────┐
│           INFRAESTRUCTURA (Adaptadores)     │
│  ┌───────────────────────────────────────┐  │
│  │        APLICACIÓN (Casos de uso)      │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │      DOMINIO (Entidades)        │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Capas

| Capa | Responsabilidad | Depende de |
|---|---|---|
| **Dominio** | Reglas de negocio puras | Nada |
| **Aplicación** | Casos de uso, orquestación | Dominio |
| **Infraestructura** | UI, persistencia, HTTP | Dominio + Aplicación |

### Estructura de carpetas

```text
src/app/
├── domain/
│   ├── models/elemento.model.ts
│   ├── ports/elemento.repository.ts
│   └── use-cases/
│       ├── listar-elementos.use-case.ts
│       ├── agregar-elemento.use-case.ts
│       └── eliminar-elemento.use-case.ts
│
├── infrastructure/
│   ├── adapters/local-storage-elemento.repository.ts
│   └── components/lista-elementos/
│       ├── lista-elementos.ts
│       ├── lista-elementos.html
│       └── lista-elementos.css
│
└── app.config.ts
```

---

## 🎯 Funcionalidades

- ✅ Agregar elementos a la lista
- ✅ Eliminar elementos
- ✅ Persistencia en `localStorage`
- ✅ Validación de entrada (no vacío, máx 100 caracteres)
- ✅ Estado reactivo con Signals
- ✅ UI limpia y responsive

---

## 🔌 ¿Cómo cambiar de localStorage a API REST?

1. Crear `src/app/infrastructure/adapters/http-elemento.repository.ts`
   que implemente `ElementoRepository`.
2. Cambiar **una línea** en `app.config.ts`:

```typescript
{
  provide: ELEMENTO_REPOSITORY,
  useClass: HttpElementoRepository, // ← antes LocalStorageElementoRepository
}
```

3. **El dominio y los casos de uso NO cambian.** 🎉

---

## 🛠️ Tecnologías

- Angular 22 (standalone, signals, zoneless)
- TypeScript 5.x
- Node.js 22.x
- npm 10.x

---

## 📝 Licencia

MIT