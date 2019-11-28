import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Material from "@angular/material";

const modules = [
  Material.MatDialogModule,
  Material.MatInputModule,
  Material.MatMenuModule,
  Material.MatToolbarModule,
  Material.MatGridListModule,
  Material.MatSliderModule,
  Material.MatGridListModule,
  Material.MatSelectModule,
  Material.MatCardModule,
  Material.MatButtonModule,
  Material.MatCheckboxModule,
  Material.MatDividerModule,
  Material.MatAutocompleteModule,
  Material.MatRadioModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatDialogModule,
  Material.MatTableModule,
  Material.MatPaginatorModule,
  Material.MatIconModule,
  Material.MatFormFieldModule,
  Material.MatCardModule,
  Material.MatListModule,
  Material.MatTooltipModule,
  Material.MatProgressSpinnerModule,
  Material.MatSnackBarModule

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
