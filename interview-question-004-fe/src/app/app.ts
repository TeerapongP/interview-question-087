import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly messageService: MessageService,
  ) {}

  public readonly occupations = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Tester', value: 'tester' },
    { label: 'Other', value: 'other' },
  ];
  public readonly form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)],
    }),
    profile: new FormControl<File | null>(null, Validators.required),
    birthDay: new FormControl<Date | null>(null, Validators.required),
    occupation: new FormControl('', { nonNullable: true, validators: Validators.required }),
    sex: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  public showError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  public selectProfile(file: File | null): void {
    this.form.controls.profile.setValue(file);
    this.form.controls.profile.markAsTouched();
  }

  public save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.peopleService.save(this.form.getRawValue()).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to save data' });
      },
    });
  }

  public clear(profileUpload: FileUpload): void {
    this.form.reset();
    profileUpload.clear();
  }
}
