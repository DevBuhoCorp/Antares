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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RolesComponent } from './nomina/roles/roles.component';
import { PopupComponentRoles } from './nomina/roles/popup/popup.component';
import { PopupComponentUser } from './nomina/usuario/popup/popup.component';
import { UsersempresaComponent } from './nomina/usuario/usersempresa/usersempresa.component';
import {UserempresafilterPipe} from '../shared/pipes/userempresafilter.pipe';
import { UsuarioComponent } from './nomina/usuario/usuario.component';


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
    

  ],
  providers: [],
  entryComponents: [
    //pop-ups 
    PopupComponentRoles,
    PopupComponentUser,
    UsersempresaComponent
   
  ]
})
export class ModulosModule {
}
