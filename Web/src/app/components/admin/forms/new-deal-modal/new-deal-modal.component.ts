import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { fadeIndAndFadeOutAnimation } from 'src/common/animations';
import { Product } from 'src/common/models/product';
import { DealService } from 'src/app/services/deal.service';
import { Deal } from 'src/common/models/deal';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-new-deal-modal',
  templateUrl: './new-deal-modal.component.html',
  styleUrl: './new-deal-modal.component.css',
  animations: [fadeIndAndFadeOutAnimation],
})
export class NewDealModalComponent {
  @Input('modal_show') show!: boolean;
  @Input('product') product!: Product;
  @Output() closeModal = new EventEmitter<boolean>();

  hasDealAlready!: boolean;

  newDealForm = new FormGroup({
    units: new FormControl('0', [Validators.min(0), Validators.max(200)]),
    discount: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(90),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(360),
    ]),
    startAt: new FormControl('', [Validators.required, this.dateValidator()]),
  });

  errorMessages = {
    units: [
      { type: 'min', message: 'Minimum units is 0' },
      { type: 'max', message: `Maximum units is 200` },
    ],
    discount: [
      { type: 'required', message: 'Discount is required' },
      { type: 'min', message: 'Minimum discount is 5' },
      { type: 'max', message: 'Maximum discount is 90' },
    ],
    duration: [
      { type: 'required', message: 'Duration is required' },
      { type: 'min', message: 'Minimum duration time is 1 hour' },
      { type: 'max', message: 'Maximum duration time is 360 hours' },
    ],
    startAt: [
      { type: 'invalidDate', message: 'Start date must be a date to come' },
    ],
  };

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dealServ: DealService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
    const id = this.product.product_id as number;
    this.dealServ.checkProductHasDeal(id).subscribe((data: any) => {
      this.hasDealAlready = data.hasDeal;
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }

  submitForm() {
    if (this.newDealForm.valid) {
      const duration =
        parseInt(this.newDealForm.value.duration as string) * 60 * 60 * 1000;
      const startAt = new Date(this.newDealForm.value.startAt as string);
      let newDeal: Deal = {
        product_id: this.product.product_id,
        product: this.product,
        units: parseInt(this.newDealForm.value.units as string),
        discount: parseInt(this.newDealForm.value.discount as string),
        fullPrice: this.product.price,
        duration: parseInt(this.newDealForm.value.duration as string),
        startAt: new Date(this.newDealForm.value.startAt as string),
        endAt: new Date(startAt.getTime() + duration),
        soft_delete: false,
      };
      //console.log(newDeal);
      this.dealServ.create(newDeal).subscribe((data: any) => {
        this.eventServ.emit('updateDeals');
        this.close();
      });
    }
  }

  open(): void {
    this.show = !this.show;
  }

  close(): void {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const date = new Date(value);
      const isValid = !isNaN(date.getTime());
      const currentDate = new Date();
      const isNotPastDate = date.getTime() > currentDate.getTime();
      if (!isValid || !isNotPastDate) {
        return { invalidDate: { value: control.value } };
      }
      return null;
    };
  }
}
