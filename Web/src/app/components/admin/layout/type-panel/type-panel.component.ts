import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { State } from 'src/common/models/state';
import { ProductType } from 'src/common/models/type';

@Component({
  selector: 'app-type-panel',
  templateUrl: './type-panel.component.html',
  styleUrls: ['./type-panel.component.css'],
  animations: [
    trigger('state', [
      state(
        'firstLoad',
        style({
          opacity: 0,
          transform: 'translateX(-200px) translateY(-50px) scale(0.7)',
        })
      ),
      state(
        'normal',
        style({
          opacity: 1,
          trasnform: 'translateX(0px) translateY(0px) scale(1)',
        })
      ),
      transition('firstLoad<=>normal', animate(300)),
    ]),

    trigger('hoverLeave', [
      state('hover', style({ transform: 'scale(1.1)' })),
      state('leave', style({ transform: 'scale(1)' })),
      transition('leave<=>hover', animate(150)),
    ]),
  ],
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

  state: State = {
    actualTab: 'create',
    animation: {
      layout: 'firstLoad',
      create: 'firstLoad',
      edit: 'firstLoad',
      delete: 'firstLoad',
      btn: 'out',
    },
  };

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

  constructor(
    private typeServ: ProductTypeService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.successOperation = false;
    setTimeout(() => {
      this.state.animation.layout = 'normal';
      this.state.animation.create = 'normal';
      this.state.animation.btn = 'in';
    }, 50);
  }

  submitForm() {
    if (this.newTypeForm.valid) {
      let newType: ProductType = {
        name: this.newTypeForm.value.name as string,
      };

      this.typeServ.create(newType).subscribe((data) => {
        this.eventServ.emit('updateTypes');
        this.successOperation = true;
        this.shouldReload = true;
        this.newTypeForm.value.name = '';
        setTimeout(() => {
          this.successOperation = false;
        }, 2000);
      });
    }
  }

  typeEditor: boolean = false;

  editType(type: ProductType) {
    if (this.state.actualTab != 'edit') {
      this.state.actualTab = 'edit';
      setTimeout(() => {
        this.state.animation.edit = 'normal';
        this.state.animation.create = 'firstLoad';
        this.state.animation.delete = 'firstLoad';
      }, 100);
    }
    if (this.state.actualTab == 'edit' && this.typeToEdit != type) {
      this.typeToEdit = type;
      this.state.animation.edit = 'firstLoad';
      setTimeout(() => {
        this.state.animation.edit = 'normal';
      }, 100);
    } else {
      this.state.actualTab = 'create';
      setTimeout(() => {
        this.state.animation.create = 'normal';
        this.state.animation.edit = 'firstLoad';
        this.state.animation.delete = 'firstLoad';
        this.typeToEdit = {} as ProductType;
        return;
      }, 100);
    }
    // if (this.showNewTypeForm && !this.typeEditor) {
    //   this.showNewTypeForm = !this.showNewTypeForm;
    //   this.typeEditor = !this.typeEditor;
    // } else if (
    //   !this.showNewTypeForm &&
    //   this.typeEditor &&
    //   type.prod_type_id == this.typeToEdit.prod_type_id
    // ) {
    //   this.showNewTypeForm = !this.showNewTypeForm;
    //   this.typeEditor = !this.typeEditor;
    // }
    // this.state.animation.edit = true;
    // this.typeToEdit = type;
    this.editTypeForm = new FormGroup({
      name: new FormControl(this.typeToEdit.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ]),
    });
  }

  deleteType(type: ProductType) {
    //this.showDeleteType = !this.showDeleteType;
    if (this.state.actualTab != 'delete') {
      this.state.actualTab = 'delete';
      setTimeout(() => {
        this.state.animation.delete = 'normal';
        this.state.animation.create = 'firstLoad';
        this.state.animation.edit = 'firstLoad';
      }, 150);
    }
    if (this.state.actualTab == 'delete' && this.typeToDelete != type) {
      this.typeToDelete = type;
      this.state.animation.delete = 'firstLoad';
      setTimeout(() => {
        this.state.animation.delete = 'normal';
      }, 150);
    } else {
      this.state.actualTab = 'create';
      setTimeout(() => {
        this.state.animation.delete = 'firstLoad';
        this.state.animation.create = 'normal';
        this.state.animation.edit = 'firstLoad';
      }, 150);
    }
  }

  submitDelete() {
    this.typeServ
      .delete(this.typeToDelete.prod_type_id as number)
      .subscribe((data) => {
        this.successDelete = true;
        this.shouldReload = true;
        this.eventServ.emit('updateTypes');
        setTimeout(() => {
          this.successDelete = false;
          //       this.showDeleteType = !this.showDeleteType;
          this.state.animation.delete = 'firstLoad';
          this.state.animation.create = 'normal';
          this.state.actualTab = 'create';
        }, 2000);
      });
  }

  submitEditForm() {
    if (this.editTypeForm.valid) {
      let updatedType: ProductType = {
        prod_type_id: this.typeToEdit.prod_type_id,
        name: this.editTypeForm.value.name as string,
      };

      this.typeServ.update(updatedType).subscribe((data) => {
        this.eventServ.emit('updateTypes');
        this.successEdit = true;
        this.shouldReload = true;
        this.editTypeForm.value.name = '';
        setTimeout(() => {
          this.successEdit = false;
          //    this.showNewTypeForm = !this.showNewTypeForm;
          this.state.animation.edit = 'firstLoad';
          this.state.animation.create = 'normal';
          this.state.actualTab = 'create';
        }, 2000);
      });
    }
  }
}
