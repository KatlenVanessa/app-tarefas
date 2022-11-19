import { PasswordService } from '../services/passwords.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.page.html',
  styleUrls: ['./passwords.page.scss'],
})
export class PasswordsPage implements OnInit {
type: any;
  constructor(
    private alertController: AlertController,
    public passwordService: PasswordService,
    public toastController: ToastController
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
          name: 'password',
          type: 'textarea',
          placeholder: 'Senha',
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
            if ((data.password !== '') && (data.title !== '')) {
              this.passwordService.addPassword(data.title, data.password);
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
              this.passwordService.delPassword(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptUptade(index: number, password: { title: any; value: any; }) {
    const alert = await this.alertController.create({
      header: 'Atualizar tarefa',
      message: 'Tem certeza disso?',
      inputs: [
        {
          name: 'title',
          type: 'textarea',
          placeholder: 'Título',
          value : password.title
        },
        {
          name: 'password',
          type: 'textarea',
          placeholder: 'Senha',
          value: password.value
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
            if ((data.password !== '')&&(data.title !== '')) {
              this.passwordService.uptadePassword(index, data.title, data.password);
            } else {
              this.presentToast();
              this.presentAlertPromptUptade(index, password);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Preencha a senha',
      duration: 2000,
    });
    toast.present();
  }
  ngOnInit() {}
}
