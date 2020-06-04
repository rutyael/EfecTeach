import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { from } from 'rxjs';



@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule  
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,

    ]

  })
  export class MaterialModule{}