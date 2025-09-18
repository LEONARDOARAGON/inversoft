import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DashboardPrincipal from './pages/dashboard-principal';
import LoginPage from './pages/login';
import GestionDeUsuarios from './pages/gesti-n-de-usuarios';
import GestionDeProveedores from './pages/gesti-n-de-proveedores';
import GestionDeProductos from './pages/gesti-n-de-productos';
import ProcesamientoDeVentas from './pages/procesamiento-de-ventas';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardPrincipal />} />
        <Route path="/dashboard-principal" element={<DashboardPrincipal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gesti-n-de-usuarios" element={<GestionDeUsuarios />} />
        <Route path="/gesti-n-de-proveedores" element={<GestionDeProveedores />} />
        <Route path="/gesti-n-de-productos" element={<GestionDeProductos />} />
        <Route path="/procesamiento-de-ventas" element={<ProcesamientoDeVentas />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
