import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule, MatDialogModule
} from '@angular/material';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './componentes/header-side/header-side.component';
import { SidebarSideComponent } from './componentes/sidebar-side/sidebar-side.component';




// ALL TIME REQUIRED 
import { AdminLayoutComponent } from './componentes/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './componentes/layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './componentes/notifications/notifications.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { BreadcrumbComponent } from './componentes/breadcrumb/breadcrumb.component';

// PIPES
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from "./pipes/excerpt.pipe";
import {UserempresafilterPipe} from './pipes/userempresafilter.pipe';

// SERVICES
import { ThemeService } from './servicios/theme.service';
import { LayoutService } from './servicios/layout.service';
import { NavigationService } from "./servicios/navigation.service";
import { RoutePartsService } from './servicios/route-parts.service';
import { AuthGuard } from './servicios/auth/auth.guard';
import { FontSizeDirective } from './directives/font-size.directive';
import { AppDropdownDirective } from './directives/dropdown.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';
import { CrudService } from './servicios/crud.service';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { ExcelService } from './servicios/excel.service';
import {ToolsService} from './servicios/tools.service';
import {AdminGuard} from './servicios/auth/admin.guard';
import { SinfotoPipe } from './pipes/sinfoto.pipe';

const classesToInclude = [
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  RelativeTimePipe,
  ExcerptPipe,
  
  SinfotoPipe
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    ThemeService,
    LayoutService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AdminGuard,
    CrudService,
    ExcelService,
    ToolsService
  ],
  declarations: classesToInclude,
  exports: classesToInclude,
  entryComponents: [
    
  ]
})
export class SharedModule { }
