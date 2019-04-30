import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatButtonToggleModule, 
  MatIconModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatMenuModule, 
  MatListModule, 
  MatDividerModule, 
  MatCardModule,
  MatGridListModule,
  MatExpansionModule
 } from '@angular/material';
import { MatBadgeModule} from '@angular/material/badge';

const Material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule, 
  MatBadgeModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatGridListModule,
  MatExpansionModule
];
@NgModule({
  imports: [ Material],
  exports: [ Material]
})
export class MaterialModule { }
