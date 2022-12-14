import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { AuthGuard } from './_guard/auth.guard';
import { PrevantUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListlResolver } from './_resolvers/member-list.resolver';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {
    path:"",
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children : [
      {path: "list", component: ListsComponent},
      {path: "members", component: MemberListComponent, resolve: {users: MemberListlResolver}},
      {path: "member/edit", component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PrevantUnsavedChanges]},
      {path: "members/:id", component: MemberDetailComponent,  resolve: {user : MemberDetailResolver}},
      {path: "message", component: MessageComponent},
    ]
  },

  {path: "", component: HomeComponent},
  {path: "**", redirectTo:"", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
