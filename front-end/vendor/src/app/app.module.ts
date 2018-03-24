import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Router, Routes } from '@angular/router';
import { DatePipe, LowerCasePipe } from '@angular/common';
// Services
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { VendorService } from './services/vendor.service';
// AuthGuard
import { AuthGuard } from './auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule} from '@angular/material';

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
import { BusinessOrdersComponent } from './business-orders/business-orders.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { BusinessSubHeaderComponent } from './business-sub-header/business-sub-header.component';
import { ListComponent } from './list/list.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MyCashComponent } from './my-cash/my-cash.component';

import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacySettingsComponent } from './privacy-settings/privacy-settings.component';
import { BusinessDashboardCoreComponent } from './business-dashboard-core/business-dashboard-core.component';
import { OrdersComponent } from './orders/orders.component';
import { VisitorAnalysisComponent } from './visitor-analysis/visitor-analysis.component';
import { CashComponent } from './cash/cash.component';
import { BusinessNotificationsComponent } from './business-notifications/business-notifications.component';
import { OfferZoneComponent } from './offer-zone/offer-zone.component';
import { BusinessAnalysisComponent } from './business-analysis/business-analysis.component';
import { CmsComponent } from './cms/cms.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessSettingsComponent } from './business-settings/business-settings.component';
import { PlanComponent } from './plan/plan.component';
import { TimingsComponent } from './timings/timings.component';
import { HomeDeliveryComponent } from './home-delivery/home-delivery.component';
import { MyPromotionsComponent } from './my-promotions/my-promotions.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { MyDocumentsComponent } from './my-documents/my-documents.component';
import { AadharComponent } from './aadhar/aadhar.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { AdsComponent } from './ads/ads.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpComponent } from './help/help.component';
import { BusinessPrivacySettingsComponent } from './business-privacy-settings/business-privacy-settings.component';
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
        path: 'all-orders',
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
        path: 'business/:id',
        component: BusinessDashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
              path: '',
              redirectTo: 'dashboard',
              pathMatch: 'full'
          },
          {
              path: 'dashboard',
              component: BusinessDashboardCoreComponent
          },
          {
              path: 'orders',
              component: OrdersComponent
          },
          {
              path: 'visitor-analysis',
              component: VisitorAnalysisComponent
          },
          {
              path: 'cash',
              component: CashComponent
          },
          {
              path: 'notifications',
              component: BusinessNotificationsComponent
          },
          {
              path: 'offer-zone',
              component: OfferZoneComponent
          },
          {
              path: 'business-analysis',
              component: BusinessAnalysisComponent
          },
          {
              path: 'cms',
              component: CmsComponent
          },
          {
              path: 'business-profile',
              component: BusinessProfileComponent
          },
          {
              path: 'business-settings',
              component: BusinessSettingsComponent
          },
          {
              path: 'privacy-settings',
              component: BusinessPrivacySettingsComponent
          },
          {
              path: 'plan',
              component: PlanComponent
          },
          {
              path: 'timings',
              component: TimingsComponent
          },
          {
              path: 'home-delivery',
              component: HomeDeliveryComponent
          },
          {
              path: 'my-promotions',
              component: MyPromotionsComponent
          },
          {
              path: 'bank-details',
              component: BankDetailsComponent
          },
          {
              path: 'my-documents',
              component: MyDocumentsComponent
          },
          {
              path: 'aadhar',
              component: AadharComponent
          },
          {
              path: 'social-media',
              component: SocialMediaComponent
          },
          {
              path: 'ads',
              component: AdsComponent
          },
          {
              path: 'feedback',
              component: FeedbackComponent
          },
          {
              path: 'help',
              component: HelpComponent
          },
        ]
    },
    {
        path: 'privacy-settings',
        component: PrivacySettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'terms',
        component: TermsComponent,
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
        ForgotComponent,
        MyCashComponent,
        BusinessDashboardCoreComponent,
        OrdersComponent,
        VisitorAnalysisComponent,
        CashComponent,
        BusinessNotificationsComponent,
        OfferZoneComponent,
        BusinessAnalysisComponent,
        CmsComponent,
        BusinessProfileComponent,
        BusinessSettingsComponent,
        PlanComponent,
        TimingsComponent,
        HomeDeliveryComponent,
        MyPromotionsComponent,
        BankDetailsComponent,
        MyDocumentsComponent,
        AadharComponent,
        SocialMediaComponent,
        AdsComponent,
        FeedbackComponent,
        HelpComponent,
        BusinessPrivacySettingsComponent,
        PrivacySettingsComponent,
        TermsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AuthService, ValidateService, AuthGuard, VendorService, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }

