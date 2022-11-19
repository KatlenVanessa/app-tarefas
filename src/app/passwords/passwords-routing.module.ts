import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordsPage } from './passwords.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordsPageRoutingModule {}
