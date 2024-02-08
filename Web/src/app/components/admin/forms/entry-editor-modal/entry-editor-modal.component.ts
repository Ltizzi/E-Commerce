import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntryService } from 'src/app/services/entry.service';
import { EventService } from 'src/app/services/event.service';
import { Entry } from 'src/common/models/entry';
import { Stock } from 'src/common/models/stock';

@Component({
  selector: 'app-entry-editor-modal',
  templateUrl: './entry-editor-modal.component.html',
  styleUrls: ['./entry-editor-modal.component.css'],
})
export class EntryEditorModalComponent {
  @Input() stock!: Stock;
  @Input() entryToEdit!: Entry;
  @Input() newOrEdit!: boolean;
  @Input() show: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadStocks = new EventEmitter<boolean>();
  @Output() reloadEntries = new EventEmitter<boolean>();

  // show: boolean = false;

  entryForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stock']) {
      this.entryForm = new FormGroup({
        cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      });
    }
    if (changes['entryToEdit']) {
      this.entryForm = new FormGroup({
        cantidad: new FormControl(this.entryToEdit.cantidad, [
          Validators.required,
          Validators.min(1),
        ]),
      });
    }
  }

  errorMessages = {
    cantidad: [
      { type: 'required', message: 'Quantity is required' },
      { type: 'min', message: 'Quantity requires at least 1 unit' },
    ],
  };

  successOperation: boolean = false;

  constructor(
    private entryServ: EntryService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.successOperation = false;
  }

  submitForm() {
    if (this.entryForm.valid) {
      if (this.newOrEdit) {
        let entry: Entry = {
          cantidad: this.entryForm.value.cantidad as number,
          stock: this.stock,
          stock_id: this.stock.stock_id as number,
        };
        this.entryServ.create(entry).subscribe((data: any) => {
          this.eventServ.emit('updateEntries');
          this.eventServ.emit('updateStock');
          this.successOperation = true;
          this.reloadStocks.emit(true);
          setTimeout(() => {
            this.successOperation = false;
            this.show = false;
          }, 5000);
        });
      } else {
        let entry: Entry = {
          entry_id: this.entryToEdit.entry_id,
          cantidad: this.entryForm.value.cantidad as number,
          stock: this.entryToEdit.stock,
          stock_id: this.entryToEdit.stock_id,
        };
        this.entryServ.update(entry).subscribe((data: any) => {
          this.eventServ.emit('updateEntries');
          this.eventServ.emit('updateStock');
          this.successOperation = true;
          this.reloadEntries.emit(true);
          setTimeout(() => {
            this.successOperation = false;
            this.show = false;
          }, 5000);
        });
      }
    }
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.closeModal.emit(this.show);
  }
}
