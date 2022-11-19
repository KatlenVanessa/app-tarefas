
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
type: any;
  constructor(
    private alertController: AlertController,
    public taskService: TasksService,
    public toastController: ToastController,
    public popoverController: PopoverController
  ) {}
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
          min: '01-01-2022',
          max: '01-01-2030',
          placeholder: 'dd/mm/aaaa',
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
            if ((data.task !== '') && (data.title !== '')) {
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

  async presentAlertPromptDelete(index: number) {
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
              this.taskService.delTask(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptUptade(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Atualizar tarefa',
      message: 'Tem certeza disso?',
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
          min: '01-01-2022',
          max: '01-01-2030',
          placeholder: 'dd/mm/aaaa',
          // eslint-disable-next-line max-len
          value: task.date.getFullYear() + '-' + ((task.date.getMonth()+1) < 10 ? '0' + task.date.getMonth()+1: task.date.getMonth()+1) + '-' + ((task.date.getDay()+1) < 10 ? '0' + task.date.getDay(): task.date.getDay())
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
            if ((data.task !== '') && (data.title !== '')) {
              this.taskService.uptadeTask(index, data.title, data.task, data.date);
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


  ngOnInit() {}
}
