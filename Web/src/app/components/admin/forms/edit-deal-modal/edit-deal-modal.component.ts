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
import { DealService } from 'src/app/services/deal.service';
import { EventService } from 'src/app/services/event.service';
import { DateUtilsService } from 'src/app/services/ui/date-utils.service';
import { Deal } from 'src/common/models/deal';

@Component({
  selector: 'app-edit-deal-modal',
  templateUrl: './edit-deal-modal.component.html',
  styleUrl: './edit-deal-modal.component.css',
})
export class EditDealModalComponent {
  @Input('modal_show') show!: boolean;
  @Input('deal') deal!: Deal;
  @Output() closeModal = new EventEmitter<boolean>();
  isLoaded: boolean = false;

  updateDealForm = new FormGroup({
    units: new FormControl('', [Validators.min(0), Validators.max(200)]),
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
    // startAt: new FormControl('', [Validators.required, this.dateValidator()]),
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
    private eventServ: EventService,
    private dateUtils: DateUtilsService
  ) {}

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.el.nativeElement);
  }
  ngOnDestroy(): void {
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }

  submitForm() {
    if (this.updateDealForm.valid) {
      const duration =
        parseInt(this.updateDealForm.value.duration as string) * 60 * 60 * 1000;
      const startAt = new Date(this.deal.startAt as Date);
      let updatedDeal: Deal = {
        deal_id: this.deal.deal_id,
        product: this.deal.product,
        units: parseInt(this.updateDealForm.value.units as string),
        discount: parseInt(this.updateDealForm.value.discount as string),
        fullPrice: this.deal.fullPrice,
        duration: parseInt(this.updateDealForm.value.duration as string),
        startAt: startAt,
        endAt: new Date(startAt.getTime() + duration),
        soft_delete: false,
      };
      console.log(updatedDeal);
      this.dealServ.create(updatedDeal).subscribe((data: any) => {
        this.eventServ.emit('updateDeals');
        this.close();
      });
    }
  }

  open() {
    this.show = !this.show;
  }
  close() {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }

  generateDateTemplate(inc: any) {
    return this.dateUtils.generateDateTemplate(inc);
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
      const date = new Date(value);
      const isValid = !isNaN(date.getTime());
      const currentDate = new Date();
      //   const isNotPastDate = date.getTime() > currentDate.getTime();
      if (!isValid)
        //|| !isNotPastDate
        return { invalidDate: { value: control.value } };
      return null;
    };
  }
}
