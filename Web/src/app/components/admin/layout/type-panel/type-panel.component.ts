import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductType } from 'src/common/models/type';

@Component({
  selector: 'app-type-panel',
  templateUrl: './type-panel.component.html',
  styleUrls: ['./type-panel.component.css'],
})
export class TypePanelComponent {
  newTypeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
  });

  typeToEdit!: ProductType;
  editTypeForm!: FormGroup;

  typeToDelete!: ProductType;

  //DOM booleans
  showNewTypeForm: boolean = true;
  showDeleteType: boolean = false;
  successOperation: boolean = false;
  successEdit: boolean = false;
  successDelete: boolean = false;

  shouldReload: boolean = false;

  errorMessages = {
    name: [
      { type: 'required', message: 'Type name is required' },
      {
        type: 'minlength',
        message: 'Type name requires at least 3 characters',
      },
      {
        type: 'maxlength',
        message: 'Type name has a maximum of 12 characters',
      },
    ],
  };

  constructor(private typeServ: ProductTypeService) {}

  ngOnInit(): void {
    this.successOperation = false;
  }

  submitForm() {
    if (this.newTypeForm.valid) {
      let newType: ProductType = {
        name: this.newTypeForm.value.name as string,
      };

      this.typeServ.create(newType).subscribe((data) => {
        this.successOperation = true;
        this.shouldReload = true;
        this.newTypeForm.value.name = '';
        setTimeout(() => {
          this.successOperation = false;
        }, 2000);
      });
    }
  }

  editType(type: ProductType) {
    this.showNewTypeForm = !this.showNewTypeForm;
    this.typeToEdit = type;
    this.editTypeForm = new FormGroup({
      name: new FormControl(this.typeToEdit.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ]),
    });
  }

  deleteType(type: ProductType) {
    this.showDeleteType = !this.showDeleteType;
    this.typeToDelete = type;
  }

  submitDelete() {
    this.typeServ.delete(this.typeToDelete.id as number).subscribe((data) => {
      this.successDelete = true;
      this.shouldReload = true;
      setTimeout(() => {
        this.successDelete = false;
        this.showDeleteType = !this.showDeleteType;
      }, 2000);
    });
  }

  submitEditForm() {
    if (this.editTypeForm.valid) {
      let updatedType: ProductType = {
        id: this.typeToEdit.id,
        name: this.editTypeForm.value.name as string,
      };

      this.typeServ.update(updatedType.id!, updatedType).subscribe((data) => {
        this.successEdit = true;
        this.shouldReload = true;
        this.editTypeForm.value.name = '';
        setTimeout(() => {
          this.successEdit = false;
          this.showNewTypeForm = !this.showNewTypeForm;
        }, 2000);
      });
    }
  }
}
