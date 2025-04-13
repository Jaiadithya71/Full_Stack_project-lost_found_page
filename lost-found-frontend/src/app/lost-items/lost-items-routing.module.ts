import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostItemFormComponent } from './lost-item-form/lost-item-form.component';
import { LostItemsListComponent } from './lost-items-list/lost-items-list.component';
import { LostItemDetailsComponent } from './lost-item-details/lost-item-details.component';
import { EditLostItemComponent } from './edit-lost-item/edit-lost-item.component';

const routes: Routes = [
  { path: '', component: LostItemsListComponent },
  { path: 'add-lost-item', component: LostItemFormComponent },
  { path: ':id', component: LostItemDetailsComponent },
  { path: 'edit-lost-item/:id', component: EditLostItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostItemsRoutingModule {}