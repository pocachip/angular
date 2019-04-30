import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecAuthorComponent } from './rec-author/rec-author.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'author',
    component: RecAuthorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
