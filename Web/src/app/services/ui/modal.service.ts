import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: any = [];

  add(modal: any) {
    // if (!modal.id || this.modals.find((x: any) => x.id === modal.id)) {
    //   throw new Error('modal must have a  unique id attribute');
    // }
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((modal: any) => modal.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find((modal: any) => modal.id === id);
    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }
    modal.open();
  }

  close() {
    const modal = this.modals.find((modal: any) => modal.isOpen);
    modal?.close();
  }
}
