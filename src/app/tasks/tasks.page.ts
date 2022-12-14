
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TrashService } from '../services/trash.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

type : String="pending";

  constructor(
    private alertController: AlertController,
    public taskService: TasksService,
    public trashService: TrashService,
    public toastController: ToastController,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.taskService.getFromStorage();

  }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar',
      inputs: [
        {
          name: 'title',
          type: 'textarea',
          placeholder: 'Título',
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'task',
          type: 'textarea',
          placeholder: 'Tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if ((data.task !== '') && (data.date !== '')) {
              this.taskService.addTask(data.title, data.task, data.date);
            } else {
              this.presentAlertPromptAdd();
              this.presentToast();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDescricao(index: number, task: any) {
    const alert = await this.alertController.create({
      header: task.title,
      message: task.value,
      buttons: [
        {
          text: 'ok',
          role: 'cancel',
        }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDone(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja marcar como concluída?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.doneTaskToast();
            this.taskService.doneTask(index);
          }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptPending(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja marcar como pendente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.doneTaskToast();
            this.taskService.doneTask(index);
          }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDelete(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: 'Tem certeza disso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteTaskToast();
            this.trashService.addTaskTrash(task);
            this.taskService.delTask(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptUptade(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Editar tarefa',
      inputs: [
        {
          name: 'title',
          type: 'textarea',
          placeholder: 'Título',
          value : task.title
        },
        {
          name: 'date',
          type: 'date',
          // eslint-disable-next-line max-len
          value: task.date.getFullYear + '-' + ((task.date.getMonth()+1) < 10 ? "0" + task.date.getMonth()+1 : task.date.getMonth()+1) + "-" + ((task.date.getDay()+1) < 10 ?"0" + task.date.getDay() : task.date.getDay())

        },
        {
          name: 'task',
          type: 'textarea',
          placeholder: 'Tarefa',
          value: task.value
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if ((data.task !== '') && (data.date !== '')) {
              this.taskService.uptadeTask(index, data.title, data.task, data.date);
              this.updateTaskToast();
            } else {
              this.presentToast();//Mensagem de alerta
              this.presentAlertPromptUptade(index, task);//Montra a janela
            }

          },
        }
      ],
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Prencha a tarefa',
      duration: 2000,
    });
    toast.present();
  }

  async updateTaskToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa Atualizada',
      duration: 2000,
    });
    toast.present();
  }

  async deleteTaskToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa Deletada',
      duration: 2000,
    });
    toast.present();
  }

  async doneTaskToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa Concluida',
      duration: 2000,
    });
    toast.present();
  }




}
