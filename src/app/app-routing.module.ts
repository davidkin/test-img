import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsMainComponent } from './components/posts-main/posts-main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: 'posts', component: PostsMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
