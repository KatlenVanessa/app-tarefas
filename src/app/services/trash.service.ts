import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  private tasks: Task[] = [];
  private passwords: Password[] = [];

  constructor() { }


  public getTasks(): Task[]{
    return this.tasks;
  }

  public addTaskTrash(task: Task){
    this.tasks.push(task);
    this.setTaskStorage();
  }

  public delTask(index: number){
    this.tasks.splice(index, 1);
    this.setTaskStorage();
  }

  public getPasswords(): Password[]{
    return this.passwords;
  }

  public addPasswordTrash(password: Password){
    this.passwords.push(password);
    this.setPasswordStorage();
  }

  public delPassword(index: number){
    this.passwords.splice(index, 1);
    this.setPasswordStorage();
  }

  public async setTaskStorage() {
    await Preferences.set({
      key: 'taskTrashs',
      value: JSON.stringify(this.tasks)
    });
  }

  public async getFromTaskStorage() {
  const resp = await Preferences.get({ key: 'taskTrashs' });
  let tempTaskTrashs : any[] = JSON.parse(resp.value!);
  if (!tempTaskTrashs != null){
    for (let t of tempTaskTrashs) {
      if (t.date != null) {
        t.date = t.date.substring(0,10);
        t.date = t.date.replace(/-/g,"/");
      }else{
        t.date = "";
      }
        const task: Task = {title: t.title, value: t.value, date: new Date(t.date), done: t.done};
        this.tasks.push(task);
      }
    }
  }

  public async setPasswordStorage() {
    await Preferences.set({
      key: 'passwordTrashs',
      value: JSON.stringify(this.passwords)
    });
  }

  public async getFromPasswordStorage() {
  const resp = await Preferences.get({ key: 'passwordTrashs' });
  let tempPasswordTrashs : any[] = JSON.parse(resp.value!);
  if (!tempPasswordTrashs != null){
    for (let t of tempPasswordTrashs) {
      if (t.value === null) {
        t.value = "";
      }
      const password: Password = {title:t.title, value:t.value, done: t.done};
      this.passwords.push(password);
      }
    }
  }
}

interface Task {
  title: string;
  value: string;
  date: Date;
  done?: boolean;
}

interface Password {
  title: string;
  value: string;
  done?: boolean;
}
