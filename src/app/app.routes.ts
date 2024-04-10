import { Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {SubscriptionsComponent} from "./components/subscriptions/subscriptions.component";
import {TrainerClassesComponent} from "./components/trainer-classes/trainer-classes.component";
import {GroupClassesComponent} from "./components/group-classes/group-classes.component";
import {ShopComponent} from "./components/shop/shop.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {CustomerProfileComponent} from "./components/customer-profile/customer-profile.component";
import {AdminProfileComponent} from "./components/admin-profile/admin-profile.component";
import {TrainerProfileComponent} from "./components/trainer-profile/trainer-profile.component";

export const routes: Routes = [
  { path: '',                   component: HomeComponent},
  { path: 'customer_profile',   component: CustomerProfileComponent},
  { path: 'admin_profile',      component: AdminProfileComponent},
  { path: 'trainer_profile',    component: TrainerProfileComponent},
  { path: 'subscriptions',      component: SubscriptionsComponent},
  { path: 'trainer_classes',    component: TrainerClassesComponent},
  { path: 'group_classes',      component: GroupClassesComponent},
  { path: 'sign_up',            component: SignUpComponent},
  { path: 'login',              component: LoginComponent}
];
