import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private passwords: Password[] = [];

  constructor() { }

  public getPasswords(): Password[]{
    return this.passwords;
  }

  public addPassword(title: string, value: string){
    const password: Password = {title, value, done: false};
    this.passwords.push(password);
    console.log(this.passwords);
  }

  public delPassword(index: number){
    this.passwords.splice(index,1);
  }

  public uptadePassword(index: number, title: string, value: string){
    let password : Password = this.passwords[index];
    password.value = value;
    password.title = title;
    this.passwords.splice(index, 1, password);
  }
}

interface Password {
  title: string;
  value: string;
  done?: boolean;
}
