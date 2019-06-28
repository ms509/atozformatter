import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonFormatterComponent } from './components/json-formatter/json-formatter.component';

const routes: Routes = [
  { path: '', component: JsonFormatterComponent },
  { path: 'json-formatter', component: JsonFormatterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
