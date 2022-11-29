import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  //private lixos: Lixo[] = [];
  private tasks: Task[] = [];

  constructor() { }


  public getTasks(): Task[]{
    return this.tasks;
  }

  public addTrash(task: Task){
    this.tasks.push(task);
    //this.setStorage();
  }
}
//  interface Lixo {
//   title: string;
//   value: string;
// }

interface Task {
  title: string;
  value: string;
  date: Date;
  done?: boolean;
  trash?: boolean;
}
