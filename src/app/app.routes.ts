import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { adminGuard } from './guards/admin-guard';
import { Proveedores } from './pages/proveedores/proveedores';
import { MateriaPrima } from './pages/materia-prima/materia-prima';
import { CompraMateria } from './pages/compra-materia/compra-materia';
import { ProductoComponent } from './pages/producto/producto';
import { DashboardComponent } from './pages/dashboard/dashboard';

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
    }
];
