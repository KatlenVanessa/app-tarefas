import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Task[] = [];

  constructor(){}

  public getTasks(): Task[]{
    return this.tasks;
  }

  public addTask(title: string, value: string, date: string){
    date = date.replace('-','/');
    const task: Task = {title, value, date: new Date(date), done: false};
    this.tasks.push(task);
    this.setStorage();
  }

  public trashTask(index: number){
    let task : Task = this.tasks[index];
    task.trash = true;
    this.setStorage();
  }

  public doneTask(index: number){
    let task : Task = this.tasks[index];
    task.done = !task.done;
    this.setStorage();
  }

  public delTask(index: number){
    this.tasks.splice(index, 1);
    this.setStorage();
  }

  public uptadeTask(index: number, title: string, value: string, date: string){
    let task : Task = this.tasks[index];
    task.value = value;
    date = date.replace('-','/');
    task.date = new Date(date);
    task.title = title;
    this.tasks.splice(index, 1, task);
    this.setStorage();
  }


    // JSON "set" example
  public async setStorage() {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(this.tasks)
    });
  }

  // JSON "get" example
  public async getFromStorage() {
  const resp = await Preferences.get({ key: 'tasks' });
  let tempTasks : any[] = JSON.parse(resp.value!);
  if (!tempTasks != null){
    for (let t of tempTasks) {
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
}



interface Task {
  title: string;
  value: string;
  date: Date;
  done?: boolean;
  trash?: boolean;
}
