
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule} from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MessageComponent } from './components/admin/message/message.component';
import { UserComponent } from './components/admin/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/admin/product/product.component';
import { LayoutComponent } from './page/layout/layout.component';
import { NotPageComponent } from './page/not-page/not-page.component';
import { ContactComponent } from './components/admin/message/contact/contact.component';
import { ChatContainerComponent } from './components/admin/message/chat-container/chat-container.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgToastModule} from 'ng-angular-popup'
import { NgParticlesModule } from "ng-particles";
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateComponent } from './components/admin/product/createproducts/create/create.component';
import { ListComponent } from './components/admin/product/createproducts/list/list.component';
import { ListorderComponent } from './components/admin/order/listorder/listorder.component';
import { UpdateComponent } from './components/admin/product/createproducts/update/update.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateHotelComponent } from './components/admin/product/create-hotel/create-hotel.component';
import { UpdateHotelComponent } from './components/admin/product/update-hotel/update-hotel.component';
import { ListPhongComponent } from './components/admin/phong/listPhong/list-phong/list-phong.component';
import { CreatePhongComponent } from './components/admin/phong/listPhong/createPhong/create-phong/create-phong.component';
import { UpdatePhongComponent } from './components/admin/phong/listPhong/updatePhong/update-phong/update-phong.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { ListPartnetComponent } from './partner/list-partnet/list-partnet.component';
import { ListHotelComponent } from './partner/list-hotel/list-hotel.component';
import { ListOrderComponent } from './partner/order/list-order/list-order.component';
import { TermsComponent } from './terms/terms/terms.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    LayoutComponent,
    NotPageComponent,
    ContactComponent,
    ChatContainerComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    RegisterComponent,
    CreateComponent,
    ListorderComponent,
    UpdateComponent,
    FeedbackComponent,
    CreateHotelComponent,
    UpdateHotelComponent,
    ListPhongComponent,
    CreatePhongComponent,
    UpdatePhongComponent,
    HeaderAdminComponent,
    ListPartnetComponent,
    ListHotelComponent,
    ListOrderComponent,
    TermsComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgToastModule,
    NgParticlesModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
