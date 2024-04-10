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

export const routes: Routes = [
  { path: '',                   component: HomeComponent},
  { path: 'profile',            component: ProfileComponent},
  { path: 'customer_profile',   component: CustomerProfileComponent},
  { path: 'subscriptions',      component: SubscriptionsComponent},
  { path: 'trainer_classes',    component: TrainerClassesComponent},
  { path: 'group_classes',      component: GroupClassesComponent},
  { path: 'sign_up',            component: SignUpComponent},
  { path: 'login',              component: LoginComponent}
];
