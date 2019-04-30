import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [ MatButtonModule, MatCardModule ],
  exports: [ MatButtonModule, MatCardModule ]
})
export class MaterialModule { }
