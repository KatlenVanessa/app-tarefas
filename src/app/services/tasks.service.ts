import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

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
    console.log(this.tasks);
  }

  public delTask(index: number){
    this.tasks.splice(index, 1);
  }

  public uptadeTask(index: number, title: string, value: string, date: string){
    let task : Task = this.tasks[index];
    task.value = value;
    date = date.replace('-','/');
    task.date = new Date(date);
    task.title = title;
    this.tasks.splice(index, 1, task);
  }
}

interface Task {
  title: string;
  value: string;
  date: Date;
  done?: boolean;
}
