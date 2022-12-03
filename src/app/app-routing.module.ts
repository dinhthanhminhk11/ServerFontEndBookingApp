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

const routes: Routes = [
  {
    path:'admin',component:LayoutComponent,canActivate:[AuthGuard],children:[
      {path:'',component:DashboardComponent},
      {path:'products',component:ProductComponent,children:[
        {path:'',component:ListComponent},
        {path:'createpro',component:CreateComponent}
      ]},
      {path:'Message',component:MessageComponent},
      {path:'order',component:ListorderComponent},
      { path: 'admin', component:StatisticalComponent},
    ]
  },
  { path: '', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: '**', component:NotPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
