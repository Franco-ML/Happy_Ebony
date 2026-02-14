# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Página web de San Valentín con sistema de desbloqueo interactivo. El proyecto consiste en:
- Pantalla de candado con input de fecha (08/12/2025)
- Cartas flotantes con pistas que se pueden abrir
- Animaciones CSS para efectos románticos
- Página principal con rosas animadas en CSS puro

## Architecture

### Estructura de archivos
- `index.html` - Estructura HTML con dos pantallas (lock screen y main screen)
- `styles.css` - Estilos y animaciones CSS
- `script.js` - Lógica de interacción y validación

### Pantallas
1. **Lock Screen** (`#lockScreen`):
   - Corazones flotantes de fondo
   - 3 cartas flotantes interactivas con pistas (click para abrir/cerrar)
   - Candado animado
   - Input de fecha (DD/MM/YYYY)
   - Validación de fecha correcta: 08/12/2025

2. **Main Screen** (`#mainScreen`):
   - Jardín de 3 rosas animadas
   - Efectos de crecimiento, balanceo y floración
   - Tema de San Valentín

### Animaciones CSS
- **Cartas**: Flotación continua, apertura 3D (rotación en eje X)
- **Candado**: Shake en error, unlock animation en éxito
- **Inputs**: Números cayendo en error
- **Rosas**: Crecimiento inicial, balanceo suave, floración pulsante
- **Corazones**: Flotación aleatoria de fondo

### Fuentes utilizadas
- Great Vibes (títulos románticos)
- Dancing Script (pistas y mensajes)
- Pacifico (botones)

## Development

### Visualizar localmente
```bash
# Abrir directamente
open index.html

# O con servidor local
python3 -m http.server 8000
# Luego: http://localhost:8000
```

### Personalizar pistas
Editar en `index.html` las etiquetas `<p class="hint-text">` dentro de cada `.letter`

### Cambiar fecha correcta
Editar en `script.js` la constante `CORRECT_DATE`:
```javascript
const CORRECT_DATE = {
    day: '08',
    month: '12',
    year: '2025'
};
```

## Design Principles

- Mobile-first responsive design
- Animaciones CSS puras (sin librerías)
- Tema romántico: rosa (#ff4081, #d81b60) y rojo
- Interacciones táctiles para móviles
