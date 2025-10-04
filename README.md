# 1. Instrucciones para correr el proyecto desde cero
# clonar el repo
git clone https://github.com/victoriatroya/ikusi-test-frontend.git
cd ikusi-test-frontend

# instalar dependencias

```bash
npm install
```

# ejecutar en local
```bash
npm run dev
```

Abre http://localhost:5173 en el navegador para ver el resultado
# 2. Librerías externas utilizadas
`react-router-dom` → navegación entre Login y Home.

`zustand` → manejo de estado global.

`chart.js `+ `react-chartjs-2 `→ visualización de gráficos dinámicos.

`tailwindcss` → estilos responsivos y modernos.


# 3. Estructura del proyecto 
  src/
   components/    # Componentes reutilizables (Botón, Select, Chart, etc.)

   constants/     # valores constantes (colores, iconos, etc.)

   views/         # pantallas principales (Login, Dashboard)

   services/      # simulación de APIs con setTimeout

   store/         # estado global (Zustand)

   helpers/       # Funciones utilitarias y de negocio (ej. cálculos de estadísticas, filtros, ordenamiento de datos, asignacion de rutas al breadcrumb)

   main.jsx       # punto de entrada

   router.jsx     # configuración de rutas + ProtectedRoute


# 4. Notas de seguridad

Por motivos de seguridad, antes de enviar la contraseña al servidor se aplica un hash SHA-256 simulado usando la librería crypto-js
.

# 5. Decisiones tecnicas
Se siguió un esquema modularizado por responsabilidad, donde cada carpeta cumple un rol específico dentro del proyecto:

components/ → Contiene componentes reutilizables.

ui/ → átomos y moléculas de UI (Button, Input, Card, Spinner, etc.).

common/ → patrones comunes que se repiten (BreadCrumbs, DashboardHeader, ErrorMessage, etc.).

charts/ → wrappers de librerías de gráficos (ej. BarChart, PieChart).

constants/ → Variables constantes y de configuración (colores, rutas, iconos, mensajes, etc.).

helpers/ → Funciones utilitarias puras y lógica de negocio que no depende de React.
Ejemplo: cálculos estadísticos como calculateStats, filtros.

mocks/ → Datos de prueba para visualizar el comportamiento del sistema.

services/ → Simulación de APIs (con setTimeout) y capa de comunicación con el backend.
Ejemplo: loginUser.js, getDataService.js.

store/ → Estado global con Zustand.

views/ → Páginas principales o “pantallas” de la aplicación (ej. Login, Dashboard).
Cada vista puede usar componentes reutilizables y conectarse al store o servicios.

Archivos raíz (App.jsx, main.jsx, router.jsx) →

App.jsx → componente raíz que monta las rutas y layouts.

main.jsx → punto de entrada de la app.

router.jsx → configuración de navegación, incluyendo ProtectedRoute y PublicRoute.
