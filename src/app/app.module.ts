import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
// import { LocationmanageComponent } from './pages/setting/locationmanage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgGridModule } from 'ag-grid-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { LocationmanageComponent } from './pages/setting/locationmanage/locationmanage.component';
import { DevicemanageComponent } from './pages/setting/locationmanage/content/devicemanage/devicemanage.component';
import { MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DrugsboundtodeviceComponent } from './pages/setting/locationmanage/content/drugsboundtodevice/drugsboundtodevice.component';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { MatDividerModule } from '@angular/material/divider';
import { DrugdictionaryComponent } from './pages/setting/locationmanage/content/drugdictionary/drugdictionary.component';
import { UsermangeComponent } from './pages/setting/usermange/usermange.component';
import { ManageusersComponent } from './pages/setting/usermange/content/manageusers/manageusers.component';
import { ManagegroupuserComponent } from './pages/setting/usermange/content/managegroupuser/managegroupuser.component';
import { PopupstepperComponent } from './components/popupstepper/popupstepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { SearchmedicinebasketComponent } from './pages/process/searchmedicinebasket/searchmedicinebasket.component';
import { TestComponent } from './components/test/test.component';
import { WorkloadComponent } from './pages/report/workload/workload.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatMenuModule} from '@angular/material/menu';
import { PaymentformatComponent } from './pages/setting/paymentformat/paymentformat/paymentformat.component';
import { ManagemealComponent } from './pages/setting/managemeal/managemeal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConveyorComponent } from './pages/setting/conveyor/conveyor/conveyor.component';
import { QueuemanageComponent } from './pages/setting/queuemanage/queuemanage/queuemanage.component';
import { StockrobotComponent } from './pages/stock/stockrobot/stockrobot.component';
import { ReciveComponent } from './pages/handheld/recive/recive.component';
import { DispenseComponent } from './pages/handheld/dispense/dispense.component';
import { HistoryComponent } from './pages/handheld/history/history.component';
import { PrepareComponent } from './pages/handheld/prepare/prepare.component';
import { PopupselecttimerangeComponent } from './components/popup/popupselecttimerange/popupselecttimerange.component';
import { PopupuserotherComponent } from './components/popup/popupuserother/popupuserother.component';

// import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    TemplateComponent,
    LoginComponent,
    LocationmanageComponent,
    DevicemanageComponent,
    PopupComponent,
    DrugsboundtodeviceComponent,
    NotificationComponent,
    DrugdictionaryComponent,
    UsermangeComponent,
    ManageusersComponent,
    ManagegroupuserComponent,
    PopupstepperComponent,
    SearchmedicinebasketComponent,
    TestComponent,
    WorkloadComponent,
    PaymentformatComponent,
    ManagemealComponent,
    ConveyorComponent,
    QueuemanageComponent,
    StockrobotComponent,
    ReciveComponent,
    DispenseComponent,
    HistoryComponent,
    PrepareComponent,
    PopupselecttimerangeComponent,
    PopupuserotherComponent,
    // ReactiveFormsModule
  ],
  imports: [
    InlineSVGModule,
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    AgGridModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSort,MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatInputModule,
    CommonModule ,
    MatDividerModule ,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    ReactiveFormsModule ,
    NgxChartsModule ,
    MatMenuModule,
    ScrollingModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [
    provideAnimations(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
