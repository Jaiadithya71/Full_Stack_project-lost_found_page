import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'lost-items', loadChildren: () => import('./lost-items/lost-items.module').then(m => m.LostItemsModule) },
  { path: '', redirectTo: '/lost-items', pathMatch: 'full' },
  { path: 'found-items', loadChildren: () => import('./found-items/found-items.module').then(m => m.FoundItemsModule) }
  // Removed: { path: 'add-lost-item', ... }, { path: 'lost-items/:id', ... }, { path: 'edit-lost-item/:id', ... }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}