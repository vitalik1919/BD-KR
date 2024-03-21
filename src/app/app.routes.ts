import { Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {SubscriptionsComponent} from "./components/subscriptions/subscriptions.component";
import {TrainerClassesComponent} from "./components/trainer-classes/trainer-classes.component";
import {GroupClassesComponent} from "./components/group-classes/group-classes.component";
import {ShopComponent} from "./components/shop/shop.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  { path: '',                   component: HomeComponent},
  { path: 'profile',            component: ProfileComponent},
  { path: 'about_us',           component: AboutUsComponent},
  { path: 'subscriptions',      component: SubscriptionsComponent},
  { path: 'trainer_classes',    component: TrainerClassesComponent},
  { path: 'group_classes',      component: GroupClassesComponent},
  { path: 'shop',               component: ShopComponent},
  { path: 'sign_up',            component: SignUpComponent},
  { path: 'login',              component: LoginComponent}
];
