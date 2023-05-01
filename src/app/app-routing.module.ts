import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarclausComponent } from './generarclaus/generarclaus.component';

const routes: Routes = [
  { path: '', component: GenerarclausComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
