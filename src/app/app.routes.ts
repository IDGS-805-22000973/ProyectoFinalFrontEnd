import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { adminGuard } from './guards/admin-guard';
import { clienteGuard } from './guards/cliente-guard';
import { Proveedores } from './pages/proveedores/proveedores';
import { MateriaPrima } from './pages/materia-prima/materia-prima';
import { CompraMateria } from './pages/compra-materia/compra-materia';
import { ProductoComponent } from './pages/producto/producto';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { Venta } from './pages/venta/venta';
import { ClienteComponent } from './pages/cliente/cliente';
import { Perfil } from './pages/perfil/perfil';
import { ClienteComentarioComponent } from './pages/comentarios/cliente-comentario/cliente-comentario';
import { AdminComentariosComponent } from './pages/comentarios/admin-comentarios/admin-comentarios';
import { CotizacionComponent } from './pages/cotizacion/cotizacion';
import { AdminCotizacionList } from './pages/admin-cotizacion-list/admin-cotizacion-list';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'usuarios',
        component: Usuarios,
        canActivate: [adminGuard]
    },
    {
        path: 'proveedores',
        component: Proveedores,
        canActivate: [adminGuard]
    },
    {
        path: 'materia-prima',
        component: MateriaPrima,
        canActivate: [adminGuard]
    },
    {
        path: 'compra-materia',
        component: CompraMateria,
        canActivate: [adminGuard]
    },
    {
        path: 'producto',
        component: ProductoComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'venta',
        component: Venta,
        canActivate: [adminGuard]
    },
    {
        path: 'cliente',
        component: ClienteComponent,
        canActivate: [clienteGuard]
    },
    {
        path: 'perfil',
        component: Perfil,
        canActivate: [clienteGuard]
    },
    {
        path: 'cliente-comentario',
        component: ClienteComentarioComponent,
        canActivate: [clienteGuard]
    },
    {
        path: 'admin-comentarios',
        component: AdminComentariosComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'cotizacion',
        component: CotizacionComponent,

    },
    {
        path: 'admin-cotizacion-list',
        component: AdminCotizacionList,
        canActivate: [adminGuard]
    }
];
