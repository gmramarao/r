import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { DatePipe, LowerCasePipe } from '@angular/common';

// Services
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { VendorService } from './services/vendor.service';
// AuthGuard
import { AuthGuard } from './auth.guard';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessSettingsComponent } from './business-settings/business-settings.component';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component';
import { BusinessOrdersComponent } from './business-orders/business-orders.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { InboxComponent } from './inbox/inbox.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { BusinessSubHeaderComponent } from './business-sub-header/business-sub-header.component';
import { ListComponent } from './list/list.component';
import { ForgotComponent } from './forgot/forgot.component';

const appRoutes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginPageComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
      path: 'add-business',
      component: AddBusinessComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'profile-settings',
      component: ProfileSettingsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'change-password',
      component: ChangePasswordComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'orders',
      component: AllOrdersComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'inbox',
      component: InboxComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'notifications',
      component: NotificationsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'business-dashboard/:id',
      component: BusinessDashboardComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'business-settings/:id',
      component: BusinessSettingsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'business-notifications/:id',
      component: BusinessNotificationsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'business-orders/:id',
      component: BusinessOrdersComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'add-products/:id',
      component: AddProductsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'add-services/:id',
      component: AddServicesComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'list/:id/:list_id',
      component: ListComponent,
      canActivate: [AuthGuard]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    MainHeaderComponent,
    AddBusinessComponent,
    MainFooterComponent,
    ProfileSettingsComponent,
    ChangePasswordComponent,
    AllOrdersComponent,
    NotificationsComponent,
    BusinessDashboardComponent,
    BusinessSettingsComponent,
    BusinessNotificationsComponent,
    BusinessOrdersComponent,
    AddProductsComponent,
    InboxComponent,
    AddServicesComponent,
    BusinessSubHeaderComponent,
    ListComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, ValidateService, AuthGuard, VendorService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
