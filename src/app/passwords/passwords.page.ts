import { PasswordService } from '../services/passwords.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.page.html',
  styleUrls: ['./passwords.page.scss'],
})
export class PasswordsPage implements OnInit {

  constructor(
    private alertController: AlertController,
    public passwordService: PasswordService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.passwordService.getFromStorage();
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
          name: 'password',
          type: 'password',
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

  async presentAlertPromptDescricao(index: number, password: any) {
    const alert = await this.alertController.create({
      header: password.title,
      message: password.value,
      buttons: [
        {
          text: 'ok',
          role: 'cancel',
        }
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
            this.deletePasswordToast()
              this.passwordService.delPassword(index);
            }
          }
      ],
    });

    await alert.present();
  }

  async presentAlertPromptUptade(index: number, password: { title: any; value: any; }) {
    const alert = await this.alertController.create({
      header: 'Editar senha',
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
            this.updatePasswordToast();
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

  async deletePasswordToast() {
    const toast = await this.toastController.create({
      message: 'Senha Deletada',
      duration: 2000,
    });
    toast.present();
  }

  async updatePasswordToast() {
    const toast = await this.toastController.create({
      message: 'Senha Atualizada',
      duration: 2000,
    });
    toast.present();
  }


}
