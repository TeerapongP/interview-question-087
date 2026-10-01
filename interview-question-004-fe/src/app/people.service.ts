import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { PersonFormValue } from '../interface/PersonFormValue';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  constructor(private readonly http: HttpClient) { }

  public save({ profile, birthDay, ...person }: PersonFormValue) {
    return from(this.fileToBase64(profile!)).pipe(
      switchMap((image) => this.http.post('http://localhost:8081/api/people', {
        ...person,
        profile: image,
        birthDate: new Intl.DateTimeFormat('en-GB').format(birthDay!),
      }, {
        headers: { 'Content-Type': 'application/json' },
      })),
    );
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
}
