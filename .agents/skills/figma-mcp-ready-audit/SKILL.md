---
name: figma-mcp-ready-audit
description: Audita y valida componentes y sistemas de diseño de Figma para asegurar que estén listos para ser consumidos por agentes de IA vía Figma MCP (como Google Antigravity o Cursor). Úsalo cuando el usuario pida revisar un componente de Figma, validar un JSON de Figma MCP, auditar tokens, Auto Layout, nomenclatura 1:1 o generar la descripción técnica de un componente para agentes.
---
# Figma MCP-Ready Audit

Audita componentes, árboles de nodos (JSON de MCP) o especificaciones de sistemas de diseño en Figma para garantizar que un agente de IA pueda interpretarlos y generar código limpio, responsivo y fiel al diseño sin alucinaciones.

## Cuándo usar este skill

- El usuario comparte un JSON de nodos de Figma MCP, una estructura de capas, una captura o una descripción de un componente para revisarlo antes de pasarlo a un agente de código.
- El usuario pide validar si un sistema de diseño o componente nuevo está "AI-ready" o "MCP-ready".
- El usuario necesita redactar o mejorar el campo nativo `Description` de un componente en Figma para darle contexto técnico a un LLM.

## Criterios de auditoría (4 Pilares)

Evalúa el componente contra estas cuatro dimensiones clave:

1. **Higiene del Árbol de Capas y Auto Layout (Layout Fidelity)**
   - El 100% de los contenedores estructurales deben usar Auto Layout (equivalente a Flexbox/Grid).
   - No deben existir `Groups` innecesarios ni coordenadas absolutas injustificadas que provoquen `position: absolute` en el código generado.
   - Todas las capas deben tener nombres semánticos en `PascalCase` o `camelCase` orientados al DOM (ej. `CardHeader`, `IconWrapper`, `Label`), prohibiendo nombres por defecto como `Frame 423`, `Group 12` o `Rectangle 5`.
   - Configuración explícita y coherente de `Hug contents` y `Fill container`.

2. **Mapeo Estricto de Props y Variantes (1:1 con Código)**
   - Las *Component Properties* deben coincidir exactamente con las props esperadas en código (ej. `variant="primary" | "ghost"`, `size="sm" | "md" | "lg"`, `isDisabled`, `hasLeftIcon`).
   - Evitar nombres puramente visuales o ambiguos en las variantes (ej. `Tipo 1`, `Azul`, `Estado=Activo`).
   - Uso correcto de propiedades booleanas (`Boolean`) para mostrar u ocultar sub-elementos (iconos, textos auxiliares) en lugar de multiplicar variantes redundantes.

3. **Tokens Semánticos vs. Valores Hardcodeados**
   - Todo color, espaciado (`padding`, `gap`), radio de borde (`border-radius`) y tipografía debe estar vinculado a Variables de Figma semánticas (ej. `surface/primary`, `text/danger`, `spacing/md`, `radius/card`).
   - Detectar y marcar como error cualquier valor hexadecimal crudo (`#FFFFFF`), píxel fijo suelto o estilo desvinculado.

4. **Component Description Coherente en Figma (Guía de Diseño y Uso)**
   - El componente maestro debe incluir en el campo nativo `Description` de Figma una descripción orientada a diseño y uso dentro del sistema (sin rutas de importación de código como `@/components/...`, librerías de JS ni etiquetas HTML/CSS), cubriendo:
     - **Propósito:** qué resuelve el componente visual y funcionalmente dentro del sistema.
     - **Variantes y propiedades:** guía rápida de cuándo elegir cada eje (`Variant`, `Use`, `Size`, `State`) o propiedad booleana/de texto.
     - **Cuándo usar / Reglas de diseño:** jerarquía visual (ej. nunca colocar dos botones `Primary` juntos en un modal/panel; combinar 1 principal + 1 secundario) y qué componente alternativo del sistema usar en los casos excluidos.
   - Las rutas de código (`importPath`) y detalles de implementación técnica (`behaviorRules`) se documentan en los contratos del repositorio (`src/design-tokens/contracts/*.contract.json`), no dentro del panel de Figma.

## Flujo de ejecución

1. **Analizar la entrada del usuario:** Identifica qué información proporcionó el usuario (árbol JSON del MCP, lista de capas/variantes, captura de pantalla o descripción textual) y aclara brevemente qué aspectos no son visibles si falta información (por ejemplo, si solo compartió una imagen y no se pueden verificar los tokens internos).
2. **Calcular el Puntaje AI-Ready (0 a 100):** Asigna una calificación ponderada (25 puntos por cada pilar) basada en los hallazgos.
3. **Listar Bloqueadores Críticos y Mejoras:** Agrupa los hallazgos por pilar indicando exactamente qué nodo, variante o propiedad falló, por qué confundirá al agente de código y cómo corregirlo en Figma.
4. **Generar la Description lista para Figma:** Redacta un bloque de texto conciso y coherente en lenguaje de diseño que el usuario pueda copiar y pegar directamente en el panel derecho (*Component Description*) de Figma para ese componente.

## Formato de salida esperado

Estructura siempre la respuesta en este orden:

- **Puntaje AI-Ready:** `XX / 100` con un resumen de 1 línea del estado general.
- **Bloqueadores Críticos (Alto impacto en generación de código):** Lista puntual de errores que harán que el agente genere mal layout, props erróneas o estilos hardcodeados.
- **Mejoras Recomendadas (Optimización):** Ajustes de nomenclatura, propiedades booleanas o limpieza de capas.
- **Component Description (Copiar y pegar en Figma):** Bloque de texto claro con propósito, variantes/propiedades y reglas de diseño/jerarquía (sin sintaxis de código ni IDs de nodo).

## Gotchas

- No inventes propiedades o capas que no estén presentes en la entrada del usuario; si se audita desde una captura visual, indica explícitamente qué puntos requieren validación en el panel de propiedades o variables de Figma.
- Mantén la propuesta de nombres y props alineada con convenciones estándar de React/TypeScript (`camelCase` para props, `PascalCase` para componentes y capas).
