import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundItemsListComponent } from './found-items-list/found-items-list.component';
import { FoundItemFormComponent } from './found-item-form/found-item-form.component';
import { FoundItemDetailsComponent } from './found-item-details/found-item-details.component';
import { EditFoundItemComponent } from './edit-found-item/edit-found-item.component';

const routes: Routes = [
  { path: '', component: FoundItemsListComponent },
  { path: 'add-found-item', component: FoundItemFormComponent },
  { path: 'details/:id', component: FoundItemDetailsComponent },
  { path: 'edit/:id', component: EditFoundItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundItemsRoutingModule {}