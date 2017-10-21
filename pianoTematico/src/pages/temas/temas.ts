import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TocarTemaPage } from '../tocar-tema/tocar-tema';
/**
 * Generated class for the TemasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temas',
  templateUrl: 'temas.html',
})
export class TemasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad TemasPage');
  }

  MarioBross(){
    localStorage.setItem("tema","MarioBross");
    this.navCtrl.push(TocarTemaPage);
  }

  Animales(){
    localStorage.setItem("tema","Animales");
    this.navCtrl.push(TocarTemaPage);
  }

  Autos(){
    localStorage.setItem("tema","Autos");
    this.navCtrl.push(TocarTemaPage);
  }

}
