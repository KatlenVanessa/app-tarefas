import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

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

   // JSON "set" example
   public async setStorage() {
    await Preferences.set({
      key: 'passwords',
      value: JSON.stringify(this.passwords)
    });
  }

  // JSON "get" example
  public async getFromStorage() {
  const resp = await Preferences.get({ key: 'passwords' });
  let tempPasswords : any[] = JSON.parse(resp.value!);
  if (!tempPasswords != null){
    for (let t of tempPasswords) {
      if (t.value === null) {
        t.value = "";
      }
      const password: Password = {title:t.title, value:t.value, done: t.done};
      this.passwords.push(password);
      }
    }
  }
}

interface Password {
  title: string;
  value: string;
  done?: boolean;
}
