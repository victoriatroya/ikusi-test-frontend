# 1. Instrucciones para correr el proyecto desde cero
# clonar el repo
git clone https://github.com/tu-usuario/ikusi-test-frontend.git
cd ikusi-test-frontend

# instalar dependencias
npm install

# ejecutar en local
npm run dev

# 2. Librerías externas utilizadas
react-router-dom → navegación entre Login y Home.

zustand → manejo de estado global.

chart.js + react-chartjs-2 → visualización de gráficos dinámicos.

tailwindcss → estilos responsivos y modernos.


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
