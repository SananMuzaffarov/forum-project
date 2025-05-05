import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { AuthGuard } from './guards/auth.guard'; 
//import { ModeratorGuard } from './guards/moderator.guard'; 
import { UserListComponent } from './components/user-list/user-list.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'topics', component: TopicListComponent}, 
  { path: 'topics/:id', component: TopicDetailComponent, children: [
      { path: 'comments', component: CommentListComponent},
      { path: 'create-comment', component: CreateCommentComponent, canActivate: [AuthGuard] }
    ]},
  { path: 'create-topic', component: CreateTopicComponent, canActivate: [AuthGuard] },
  { path: 'edit-topic/:id', component: EditTopicComponent, canActivate: [AuthGuard] },
  { path: 'edit-comment/:id', component: EditCommentComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/topics', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
