import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AProposComponent} from "./a-propos/a-propos.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  { path: 'aPropos', component: AProposComponent },
  { path: 'contacts', component: ContactComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
