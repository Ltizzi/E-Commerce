import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/common/models/user';

@Component({
  selector: 'app-editprofilemodal',
  templateUrl: './editprofilemodal.component.html',
  styleUrls: ['./editprofilemodal.component.css'],
})
export class EditprofilemodalComponent {
  @Input('modal_show') show!: boolean;
  @Input('user') user!: User;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadProfile = new EventEmitter<boolean>();
  @Output() updatedProfile = new EventEmitter<User>();

  editProfileForm!: FormGroup;
  success = false;
  avatarUrl!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.editProfileForm = new FormGroup({
        username: new FormControl(this.user.username, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ]),
        name: new FormControl(this.user.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]),
        lastname: new FormControl(this.user.lastname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(7),
          Validators.maxLength(40),
        ]),
        avatar: new FormControl(this.user.avatar, [
          Validators.minLength(10),
          Validators.maxLength(200),
        ]),
        birthday: new FormControl(this.user.birthday, [
          Validators.required,
          this.dateValidator(),
        ]),
      });
      this.avatarUrl = this.editProfileForm.value.avatar;
    }
  }

  errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username requires at least 4 characters' },
      { type: 'maxlenght', message: 'Username has a maximum of 25 characters' },
    ],
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name requires at least 2 characters' },
      { type: 'maxlength', message: 'Name has a maximum of 25 characters' },
    ],
    lastname: [
      { type: 'required', message: 'Lastname is required' },
      { type: 'minlength', message: 'Lastname requires at least 2 characters' },
      { type: 'maxlenght', message: 'Lastname has a maxium of 30 characters' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minlength', message: 'Email requires at least 7 chracters' },
      { type: 'maxlength', message: 'Email has a maximum of 40 characters' },
      { type: 'email', message: 'Email has to be a valid email address' },
    ],
    avatar: [
      {
        type: 'minlength',
        message: 'Avatar url requires at least 10 characters',
      },
      {
        type: 'maxlength',
        message: 'Avatar url has a maximum of 200 characters',
      },
    ],
    birthday: [
      { type: 'required', message: 'Birthday date is required' },
      {
        type: 'dateValidator',
        message: 'Date must be valid/you have to be at least18 years old',
      },
    ],
  };

  constructor(private userServ: UserService) {}

  ngOnInit(): void {
    this.avatarUrl = this.user.avatar;
  }

  submitForm() {
    if (this.editProfileForm.valid) {
      let updatedProfile: User = {
        user_id: this.user.user_id,
        username: this.editProfileForm.value.username as string,
        name: this.editProfileForm.value.name as string,
        lastname: this.editProfileForm.value.lastname as string,
        email: this.editProfileForm.value.email as string,
        avatar: this.editProfileForm.value.avatar as string,
        birthday: this.editProfileForm.value.birthday as Date,
        carts: this.user.carts,
        purchases: this.user.purchases,
        roles: this.user.roles,
        favourites: this.user.favourites,
        reviews: this.user.reviews,
      };

      console.log(updatedProfile);
      this.userServ.update(updatedProfile).subscribe((data: any) => {
        if (data.user_id == this.user.user_id) {
          localStorage.setItem('user', data);
          this.updatedProfile.emit(data);
          this.reloadProfile.emit();
          this.close();
        }
      });
      // call to userServ to update
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
      const date = control.value;
      if (date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime()) || parsedDate > this.getLimitDate()) {
          return { invalidDate: true };
        }
      }
      return null;
    };
  }

  getLimitDate(): Date {
    const limitDate = new Date();
    limitDate.setFullYear(limitDate.getFullYear() - 18);
    return limitDate;
  }
}
