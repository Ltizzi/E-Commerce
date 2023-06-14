import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { Entry } from 'src/common/models/entry';

@Component({
  selector: 'app-delete-entry-modal',
  templateUrl: './delete-entry-modal.component.html',
  styleUrls: ['./delete-entry-modal.component.css'],
})
export class DeleteEntryModalComponent {
  @Input('show') show!: boolean;
  @Input('entry') entry!: Entry;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadEntries = new EventEmitter<boolean>();

  successOperation: boolean = false;

  constructor(private entryServ: EntryService) {}

  deleteEntry() {
    this.entryServ.delete(this.entry.entry_id as number).subscribe((data) => {
      this.successOperation = true;
      setTimeout(() => {
        this.successOperation = false;
        this.show = false;
      }, 3000);
    });
  }

  close() {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }
}
