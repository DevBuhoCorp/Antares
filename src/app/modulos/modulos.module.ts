import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {

  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatRadioModule,
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
import { PaisComponent } from './localizacion/pais/pais.component';
import { CiudadComponent } from './localizacion/ciudad/ciudad.component';
import { PopupPaisComponent} from './localizacion/pais/popup/popup.component';
import {PopupCiudadComponent} from './localizacion/ciudad/popup/popup.component';
import { BodegaComponent } from './bodega/bodega/bodega.component';
import {PopupBodegaComponent} from './bodega/bodega/popup/popup.component';
import { TipomovimientoComponent } from './bodega/tipomovimiento/tipomovimiento.component';
import { PopupTipoMovimientoComponent } from './bodega/tipomovimiento/popup/popup.component';
import { OrdenpedidoComponent } from './compras/ordenpedido/ordenpedido.component';
import { OPedidoPopupComponent } from './compras/ordenpedido/popup/popup.component';
import { BorradorComponent } from './compras/listaopedido/borrador/borrador.component';
import { ListaComponent } from './compras/listaopedido/borrador/lista/lista.component';
import { BodegatmovimientoComponent } from './bodega/bodegatmovimiento/bodegatmovimiento.component';
import { UsuariotmovimientoComponent } from './nomina/usuariotmovimiento/usuariotmovimiento.component';
import { UsuariobodegaComponent } from './nomina/usuariobodega/usuariobodega.component';
import { VisualizarComponent } from './compras/listaopedido/borrador/visualizar/visualizar.component';
import { AutorizarComponent } from './compras/listaopedido/autorizar/autorizar.component';
import { AutorizarPopupComponent } from './compras/listaopedido/autorizar/popup/popup.component';
import { TipodocumentoComponent } from './catalogos/tipodocumento/tipodocumento.component';
import { PopupTipoDocumentoComponent } from './catalogos/tipodocumento/popup/popup.component';
import { TipomovimientoreversoComponent } from './movimiento/tipomovimientoreverso/tipomovimientoreverso.component';
import { NuevacotizacionComponent } from './compras/cotizacion/nuevacotizacion/nuevacotizacion.component';
import { PopUpListacotizacionComponent } from './compras/cotizacion/nuevacotizacion/listacotizacion/listacotizacion.component';
import { ListaprovcotizacionComponent } from './compras/cotizacion/listacotizacion/listacotizacion.component';
import { AsignarprovComponent } from './compras/cotizacion/listacotizacion/asignarprov/asignarprov.component';
import { PopupemailComponent } from './compras/cotizacion/listacotizacion/popupemail/popupemail.component';
import { QuillModule } from 'ngx-quill';
import { MovimientoComponent } from './movimiento/movimiento/movimiento.component';
import {NgxCurrencyModule} from 'ngx-currency';
import { CotizacionproveedorComponent } from './compras/cotizacion/cotizacionproveedor/cotizacionproveedor.component';
import { ListaocompraComponent } from './compras/ordencompra/listaocompra/listaocompra.component';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ".",
  precision: 4,
  prefix: "$ ",
  suffix: "",
  thousands: ",",
  nullable: false
};

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
    MatRadioModule,
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
    QuillModule,
    //PrimeNG
    TreeModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
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
    PaisComponent,
    CiudadComponent,
    PopupCiudadComponent,
    PopupPaisComponent,
    BodegaComponent,
    PopupBodegaComponent,
    TipomovimientoComponent,
    PopupTipoMovimientoComponent,

    PresupuestoComponent,
    OrdenpedidoComponent,
    OPedidoPopupComponent,
    BorradorComponent,
    ListaComponent,
    BodegatmovimientoComponent,
    UsuariotmovimientoComponent,
    UsuariobodegaComponent,
    VisualizarComponent,
    AutorizarComponent,
    AutorizarPopupComponent,
    TipodocumentoComponent,
    PopupTipoDocumentoComponent,
    TipomovimientoreversoComponent,
    PopupTipoDocumentoComponent,
    NuevacotizacionComponent,
    PopUpListacotizacionComponent,
    ListaprovcotizacionComponent,
    AsignarprovComponent,
    PopupemailComponent,
    MovimientoComponent,
    CotizacionproveedorComponent,
    ListaocompraComponent

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
    OPedidoPopupComponent,
    PopupCiudadComponent,
    PopupPaisComponent,
    PopupBodegaComponent,
    PopupTipoMovimientoComponent,
    AutorizarPopupComponent,
    PopupTipoDocumentoComponent,
    PopUpListacotizacionComponent,
    PopupemailComponent
  ]
})
export class ModulosModule {
}
