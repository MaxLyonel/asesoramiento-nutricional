Pact - Contract testing (avance)
================================

Este repositorio incluye un avance de Contract Testing usando Pact.

Archivos añadidos:
- `src/test/pact/consumer/patient.pact.spec.ts`: pruebas de consumidor que generan un contrato en `pacts/`.
- `src/test/pact/provider/patient.pact.verify.spec.ts`: prueba de verificación del proveedor que arranca la app Nest y verifica el pact.

Requisitos
- Node 18+ (para `fetch` global). Si tu Node no incluye `fetch`, instala `node-fetch`.
- Instalar dependencias: `npm install`.

Ejecutar pruebas de consumer (genera el pact):
```
npm test -- src/test/pact/consumer/patient.pact.spec.ts
```

Ejecutar verificación del provider (debe levantarse la app y verificar el pact):
```
npm test -- src/test/pact/provider/patient.pact.verify.spec.ts
```

Notas
- Los pact generados se ubican en `./pacts/`.
- Esto es un avance: la intención es mostrar dos interacciones del consumidor (POST create y GET by id) y su verificación desde el provider.
