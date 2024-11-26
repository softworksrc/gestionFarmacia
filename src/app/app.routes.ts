import { Routes } from '@angular/router';
import { ListaProductoMalEstadoComponent } from '../app/views/gestionFarmacia/admin/productoMalEstado/lista-producto-mal-estado/lista-producto-mal-estado.component';
import { CrearProductoMalEstadoComponent } from '../app/views/gestionFarmacia/admin/productoMalEstado/crear-producto-mal-estado/crear-producto-mal-estado.component';
import { EditarProductoMalEstadoComponent } from '../app/views/gestionFarmacia/admin/productoMalEstado/editar-producto-mal-estado/editar-producto-mal-estado.component';
import { ProductoMalEstadoIndexComponent } from '../app/views/gestionFarmacia/public/productoMalEstado/producto-mal-estado-index/producto-mal-estado-index.component';
import { MenuComponent } from '../app/views/gestionFarmacia/public/menu/menu.component';
import { ListaEstanteriaComponent } from '../app/views/gestionFarmacia/admin/estanteria/lista-estanteria/lista-estanteria.component';
import { CrearEstanteriaComponent } from '../app/views/gestionFarmacia/admin/estanteria/crear-estanteria/crear-estanteria.component';
import { EditarEstanteriaComponent } from '../app/views/gestionFarmacia/admin/estanteria/editar-estanteria/editar-estanteria.component';
import { CrudEstanteriaComponent } from '../app/views/gestionFarmacia/admin/estanteria/crud-estanteria/crud-estanteria.component';
import { NavbarComponent } from '../app/views/gestionFarmacia/admin/navbar/navbar.component';
import { EstanteriaComponent } from '../app/views/gestionFarmacia/public/estanteria/estanteria.component';
import { MenuAdministrativoComponent } from '../app/views/gestionFarmacia/admin/menu-administrativo/menu-administrativo.component';



import { LoginComponent } from './views/autenticacion/login/login.component';
import { AuthGuard } from './services/firebase-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    //ADMIN
    { path: 'lista-producto-mal-estado', component: ListaProductoMalEstadoComponent,canActivate: [AuthGuard] },
    { path: 'crear-producto-mal-estado', component: CrearProductoMalEstadoComponent,canActivate: [AuthGuard] },
    { path: 'editar-producto-mal-estado/:id', component: EditarProductoMalEstadoComponent,canActivate: [AuthGuard] },
    { path: 'lista-estanteria', component: ListaEstanteriaComponent,canActivate: [AuthGuard] },
    { path: 'crear-estanteria', component: CrearEstanteriaComponent,canActivate: [AuthGuard] },
    { path: 'editar-estanteria/:id', component: EditarEstanteriaComponent,canActivate: [AuthGuard] },
    { path: 'crud-estanteria', component: CrudEstanteriaComponent,canActivate: [AuthGuard] },
    { path: 'navbar', component: NavbarComponent,canActivate: [AuthGuard] },
    { path: 'menu-administrativo', component: MenuAdministrativoComponent,canActivate: [AuthGuard] },

    //PUBLIC
    { path: 'producto-mal-estado-index', component: ProductoMalEstadoIndexComponent},
    { path: 'estanteria', component: EstanteriaComponent },
    { path: 'menu', component: MenuComponent},
 
];
