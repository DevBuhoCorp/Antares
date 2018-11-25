import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {

  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatCheckboxModule
} from '@angular/material';
// PrimeNG
import {TreeModule} from 'primeng/tree';

import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppConfirmModule} from '../shared/servicios/app-confirm/app-confirm.module';
import {AppLoaderModule} from '../shared/servicios/app-loader/app-loader.module';
import {ModulosRoutes} from './modulos.routing';
import {FileUploadModule} from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './nomina/roles/roles.component';
import { PopupComponentRoles } from './nomina/roles/popup/popup.component';
import { PopupComponentUser } from './nomina/usuario/popup/popup.component';
import { UsersempresaComponent } from './nomina/usuario/usersempresa/usersempresa.component';
import {UserempresafilterPipe} from '../shared/pipes/userempresafilter.pipe';
import { UsuarioComponent } from './nomina/usuario/usuario.component';
import { AreaComponent } from './catalogos/area/area.component';
import { AreaPopupComponent } from './catalogos/area/popup/popup.component';
import { DepartamentoComponent } from './catalogos/departamento/departamento.component';
import { DepartamentoPopupComponent } from './catalogos/departamento/popup/popup.component';
import { CargoComponent } from './catalogos/cargo/cargo.component';
import { CargoPopupComponent } from './catalogos/cargo/popup/popup.component';
import { ColaboradorComponent } from './nomina/colaborador/colaborador.component';
import { ColaboradorPopupComponent } from './nomina/colaborador/popup/popup.component';
import { ColaboradorareaComponent } from './nomina/colaboradorarea/colaboradorarea.component';
import { ColaboradorAreaPopupComponent } from './nomina/colaboradorarea/popup/popup.component';
import { TipoemisorComponent } from './catalogos/tipoemisor/tipoemisor.component';
import { TipoidentificacionComponent } from './catalogos/tipoidentificacion/tipoidentificacion.component';
import { ContribuyenteComponent } from './catalogos/contribuyente/contribuyente.component';
import { PopupTipoEmisorComponent} from './catalogos/tipoemisor/popup/popup.component';
import {PopupTipoIdentificacionComponent} from './catalogos/tipoidentificacion/popup/popup.component';
import {PopupContribuyenteComponent} from './catalogos/contribuyente/popup/popup.component';
import {ProveedorComponent} from './compras/proveedor/proveedor.component';
import {PopupProveedorComponent} from './compras/proveedor/popup/popup.component';
import { PresupuestoComponent } from './compras/presupuesto/presupuesto.component';
import {NgxMaskModule} from 'ngx-mask';
import { OrdenpedidoComponent } from './compras/ordenpedido/ordenpedido.component';
import { OPedidoPopupComponent } from './compras/ordenpedido/popup/popup.component';


@NgModule({
  imports: [
    //modulos
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AppConfirmModule,
    AppLoaderModule,
    MatTabsModule,
    FileUploadModule,
    MatProgressBarModule,
    HttpClientModule,
    MatAutocompleteModule,
    //PrimeNG
    TreeModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(ModulosRoutes)
  ],
  declarations: [
    //componentes
    UsuarioComponent,
    RolesComponent,
    PopupComponentRoles,
    PopupComponentUser,
    UsersempresaComponent,
    UserempresafilterPipe,
    AreaComponent,
    AreaPopupComponent,
    DepartamentoComponent,
    DepartamentoPopupComponent,
    CargoComponent,
    CargoPopupComponent,
    ColaboradorComponent,
    ColaboradorPopupComponent,
    ColaboradorareaComponent,
    ColaboradorAreaPopupComponent,
    
    TipoemisorComponent,
    TipoidentificacionComponent,
    ContribuyenteComponent,
    ProveedorComponent,
    PopupTipoIdentificacionComponent,
    PopupTipoEmisorComponent,
    PopupContribuyenteComponent,
    PopupProveedorComponent,
    PresupuestoComponent,
    OrdenpedidoComponent,
    OPedidoPopupComponent

  ],
  providers: [],
  entryComponents: [
    //pop-ups 
    PopupComponentRoles,
    PopupComponentUser,
    UsersempresaComponent,
    AreaPopupComponent,
    DepartamentoPopupComponent,
    CargoPopupComponent,
    ColaboradorPopupComponent,
    ColaboradorAreaPopupComponent,
    PopupTipoIdentificacionComponent,
    PopupTipoEmisorComponent,
    PopupContribuyenteComponent,
    PopupProveedorComponent,
    OPedidoPopupComponent
   
  ]
})
export class ModulosModule {
}
