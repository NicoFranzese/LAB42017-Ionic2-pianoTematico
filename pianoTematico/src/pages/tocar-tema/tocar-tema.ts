import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
//import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the TocarTemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tocar-tema',
  templateUrl: 'tocar-tema.html',
})
export class TocarTemaPage {
  public imagenes = [];
  private secuenciaGrabada = [];
  private sonidoReproduccion;
  public indice;
  private reproducirSiNo = "Si";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeAudio: NativeAudio,
    //private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) {
    this.CargarTematica();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TocarTemaPage');
  }

  CargarTematica() {
      this.imagenes = [
        {
          "url": "./assets/img/" +localStorage.getItem("tema")+ "/1.jpg"
        },
        {
          "url": "./assets/img/" +localStorage.getItem("tema")+ "/2.jpg"
        },
        {
          "url": "./assets/img/" +localStorage.getItem("tema")+ "/3.jpg"
        },
        {
          "url": "./assets/img/" +localStorage.getItem("tema")+ "/4.jpg"
        },
        {
          "url": "./assets/img/" +localStorage.getItem("tema")+ "/5.jpg"
        }
      ];    

      this.secuenciaGrabada = [];
      
      this.nativeAudio.unload('1');
      this.nativeAudio.unload('2');
      this.nativeAudio.unload('3');
      this.nativeAudio.unload('4');
      this.nativeAudio.unload('5');
      this.nativeAudio.preloadSimple('1','assets/sonidos/' +localStorage.getItem("tema")+ '/1.mp3').then((menj)=>console.log(menj),(err)=>console.log(err));
      this.nativeAudio.preloadSimple('2','assets/sonidos/' +localStorage.getItem("tema")+ '/2.mp3').then((menj)=>console.log(menj),(err)=>console.log(err));
      this.nativeAudio.preloadSimple('3','assets/sonidos/' +localStorage.getItem("tema")+ '/3.mp3').then((menj)=>console.log(menj),(err)=>console.log(err));
      this.nativeAudio.preloadSimple('4','assets/sonidos/' +localStorage.getItem("tema")+ '/4.mp3').then((menj)=>console.log(menj),(err)=>console.log(err));
      this.nativeAudio.preloadSimple('5','assets/sonidos/' +localStorage.getItem("tema")+ '/5.mp3').then((menj)=>console.log(menj),(err)=>console.log(err));
  }

  play(id_sonido){
    this.sonidoReproduccion = id_sonido;
    this.nativeAudio.play(id_sonido).then(
      (msg)=>{this.secuenciaGrabada.push(id_sonido);
              console.log("exito"+msg)}, 
      (err) => console.log("error"+err)
    );

    //this.secuenciaGrabada.push(id_sonido);
    //console.log("secuencia:"+this.secuenciaGrabada);

  }

  IniciarMelodia(){
    this.secuenciaGrabada = [];
    this.indice = -1;
  }

  TocarMelodia()
  {
    console.log(this.secuenciaGrabada);
    if(this.secuenciaGrabada.length == 0)
    {
      this.mensajeToast("No tocó ninguna melodía");
    }
    else
    {        
      if(this.reproducirSiNo == "Si"){
        this.reproducirSiNo = "No";               
        this.reproducir();
        this.mensajeToast("Reproduciendo Melodía...");
      }else if(this.reproducirSiNo == "No"){
        this.reproducirSiNo = "Si";
        this.nativeAudio.stop(this.secuenciaGrabada[this.indice]).then((msg)=>console.log(msg), (err) =>console.log(err));
      }       
    }
  }

  reproducir()
  {
    this.indice += 1;

    if(this.indice < this.secuenciaGrabada.length){
      this.nativeAudio.play(this.secuenciaGrabada[this.indice], ()=> this.reproducir()).then((msg)=>console.log(msg), (err) => console.log(err));
    }
    else{
      console.log("Estoy cambiando el boton de stop por play");
      this.reproducirSiNo = "Si";
      this.indice = -1;
    }
  }

  private mensajeToast(message: string)
  {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
