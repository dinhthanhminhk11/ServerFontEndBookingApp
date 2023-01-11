import { ListorderComponent } from './components/admin/order/listorder/listorder.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MessageComponent } from './components/admin/message/message.component';
import { CreateComponent } from './components/admin/product/createproducts/create/create.component';
import { ListComponent } from './components/admin/product/createproducts/list/list.component';
import { ProductComponent } from './components/admin/product/product.component';
import { LayoutComponent } from './page/layout/layout.component';
import { LoginComponent } from './page/login/login.component';
import { NotPageComponent } from './page/not-page/not-page.component';
import { RegisterComponent } from './page/register/register.component';
import { StatisticalComponent } from './components/admin/statistical/statistical.component';
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

const routes: Routes = [
  {
    path: 'host', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', component: DashboardComponent },
      {
        path: 'products', component: ProductComponent, children: [
          { path: '', component: ListComponent },
          { path: 'createpro', component: CreateHotelComponent },
          { path: 'updatepro', component: UpdateComponent },
        ]
      },
      {path: 'listphong',component: ListPhongComponent},
      {path: 'createphong',component: CreatePhongComponent},
      {path: 'updatephong',component: UpdatePhongComponent},
      {path: 'updatehotel',component: UpdateHotelComponent},
      { path: 'feedback', component: FeedbackComponent },
      { path: 'Message', component: MessageComponent },
      { path: 'order', component: ListorderComponent },
      { path: 'admin', component: StatisticalComponent },
    ]
  },
  {path: 'admin',  component: HeaderAdminComponent},
  {path: 'admin/listPartnet' , component: ListPartnetComponent},
  {path: 'admin/listHotel' , component: ListHotelComponent},
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
