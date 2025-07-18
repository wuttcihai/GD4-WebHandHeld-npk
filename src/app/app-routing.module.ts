import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './service/auth/auth.guard';
import { LocationmanageComponent } from './pages/setting/locationmanage/locationmanage.component';
import { UsermangeComponent } from './pages/setting/usermange/usermange.component';
import { SearchmedicinebasketComponent } from './pages/process/searchmedicinebasket/searchmedicinebasket.component';
import { TestComponent } from './components/test/test.component';
import { WorkloadComponent } from './pages/report/workload/workload.component';
import { PaymentformatComponent } from './pages/setting/paymentformat/paymentformat/paymentformat.component';
import { ManagemealComponent } from './pages/setting/managemeal/managemeal.component';
import { ConveyorComponent } from './pages/setting/conveyor/conveyor/conveyor.component';
import { QueuemanageComponent } from './pages/setting/queuemanage/queuemanage/queuemanage.component';
import { StockrobotComponent } from './pages/stock/stockrobot/stockrobot.component';
import { DispenseComponent } from './pages/handheld/dispense/dispense.component';
import { HistoryComponent } from './pages/handheld/history/history.component';
import { ReciveComponent } from './pages/handheld/recive/recive.component';
import { PrepareComponent } from './pages/handheld/prepare/prepare.component';
import { WardComponent } from './pages/ward/ward.component';
// import { LocationmanageComponent } from './pages/setting/locationmanage/locationmanage.component';

const routes: Routes = [
  { path: 'dispense', component: DispenseComponent },
  { path: 'recive', component: ReciveComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'prepare', component: PrepareComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'locationmanage', component: LocationmanageComponent,canActivate: [AuthGuard]},
  // { path: 'usermanage', component: UsermangeComponent,canActivate: [AuthGuard]},
  // { path: 'searchmedicinebasket', component: SearchmedicinebasketComponent,canActivate: [AuthGuard]},
  // { path: 'workload', component: WorkloadComponent,canActivate: [AuthGuard]},
  // { path: 'paymentformat', component: PaymentformatComponent,canActivate: [AuthGuard]},
  // { path: 'managemeal', component: ManagemealComponent,canActivate: [AuthGuard]},
  // { path: 'settingconveyor', component: ConveyorComponent,canActivate: [AuthGuard]},
  // { path: 'settingdashboardqueue', component: QueuemanageComponent,canActivate: [AuthGuard]},
  // { path: 'stockrobot', component: StockrobotComponent,canActivate: [AuthGuard]},
  // { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ward', component: WardComponent },

  // { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/locationmanage', pathMatch: 'full' },
  // { path: '', redirectTo: '/usermanage', pathMatch: 'full' },
  // { path: '', redirectTo: '/searchmedicinebasket', pathMatch: 'full' },
  // { path: '', redirectTo: '/test', pathMatch: 'full' },
  // { path: '', redirectTo: '/workload', pathMatch: 'full' },
  // { path: '', redirectTo: '/paymentformat', pathMatch: 'full' },
  // { path: '', redirectTo: '/managemeal', pathMatch: 'full' },
  // { path: '', redirectTo: '/settingconveyor', pathMatch: 'full' },
  // { path: '', redirectTo: '/settingdashboardqueue', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
