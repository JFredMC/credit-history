# EXPEDIENTE

<p align="center">
  <img src="frontend/public/favicon.svg" width="72" alt="EXPEDIENTE" />
</p>

<h1 align="center">EXPEDIENTE</h1>

<p align="center">
  <b>Tu expediente crediticio bajo control.</b><br />
  Dashboard de historial crediticio personal con score, deuda, comportamiento de pago, acreedores y alertas.
</p>

<p align="center">
  <a href="https://jfredmc.github.io/credit-history/"><b>Ver la demo</b></a>
</p>

## Qué es EXPEDIENTE

EXPEDIENTE es una demo fintech inspirada en el historial crediticio colombiano, mejorada y presentada como una experiencia de producto real. La idea es mostrar cómo luciría un dashboard personal de crédito con score, deuda, historial, timeline de movimientos y alertas de riesgo, pero sin depender de datos bancarios reales.

## Qué incluye

- Score crediticio con rango 150–950
- KPI de deuda total, cuota mensual, deuda vencida y pagos a tiempo
- Historial de créditos por acreedor y tipo
- Timeline de movimientos y alertas clave
- Detalle por acreedor con riesgo, monto y observaciones
- Reporte exportable en JSON y CSV
- Tema claro y oscuro
- Diseño responsivo y moderno
- Estructura lista para conectar con un backend NestJS en una siguiente etapa

## Arquitectura

```text
credit-history/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── brand/
│   └── src/
│       ├── app/
│       │   ├── core/
│       │   ├── features/
│       │   ├── layout/
│       │   └── shared/
│       ├── index.html
│       ├── main.ts
│       └── styles.css
├── backend/
│   └── src/
├── docs/
├── .github/workflows/
├── package.json
├── README.md
└── LICENSE
```

## Ejecutarlo localmente

```bash
cd frontend
npm install
npm start
```

La aplicación se sirve en:

```text
http://localhost:4200
```

## Deploy en GitHub Pages

El proyecto tiene un workflow de GitHub Actions para publicar la app en GitHub Pages. La configuración correcta debe ser:

1. Ir a GitHub > Settings > Pages
2. En Source seleccionar "GitHub Actions"
3. Asegurarse de que la workflow `Deploy to GitHub Pages` está activa
4. Hacer push a `main`

Luego la demo queda en:

```text
https://jfredmc.github.io/credit-history/
```

## Importante

El README no debe verse como la app. Para que la URL pública muestre la demo, GitHub Pages debe apuntar al artefacto generado por Angular y no a la raíz del repositorio.

## Licencia

MIT © Jhon Maquilón · JFredDev
