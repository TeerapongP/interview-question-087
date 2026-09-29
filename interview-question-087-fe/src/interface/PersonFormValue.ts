export interface PersonFormValue {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: File | null;
  birthDay: Date | null;
  occupation: string;
  sex: string;
}