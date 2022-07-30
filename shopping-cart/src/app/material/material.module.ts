import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';



const material = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSnackBarModule

];


@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule { }
