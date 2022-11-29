import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TrashService } from '../services/trash.service';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {

  constructor( private alertController: AlertController,
    public trashService: TrashService,
    public toastController: ToastController,
    public popoverController: PopoverController) { }

  ngOnInit() {
  }

}
