import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PasswordService } from '../services/passwords.service';
import { TasksService } from '../services/tasks.service';
import { TrashService } from '../services/trash.service';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {

  type : String="tasks";

  constructor(
    private alertController: AlertController,
    public taskService: TasksService,
    public passwordService: PasswordService,
    public trashService: TrashService,
    public toastController: ToastController,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.trashService.getFromTaskStorage();
    this.trashService.getFromPasswordStorage();
  }

  async presentAlertPromptRestTask(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Restaurar',
      message: 'Tem certeza disso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.restTaskToast();
            this.taskService.restTrash(task);
            this.trashService.delTask(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDeleteTask(index: number) {
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
            this.trashService.delTask(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptRestPassword(index: number, password: any) {
    const alert = await this.alertController.create({
      header: 'Restaurar',
      message: 'Tem certeza disso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.restPasswordToast();
            this.passwordService.restTrash(password);
            this.trashService.delPassword(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptDeletePassword(index: number) {
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
            this.deletePasswordToast();
            this.trashService.delPassword(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async restPasswordToast() {
    const toast = await this.toastController.create({
      message: 'Senha Restaurada',
      duration: 2000,
    });
    toast.present();
  }
  async deletePasswordToast() {
    const toast = await this.toastController.create({
      message: 'Senha Deletada',
      duration: 2000,
    });
    toast.present();
  }

  async restTaskToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa Restaurada',
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
}
