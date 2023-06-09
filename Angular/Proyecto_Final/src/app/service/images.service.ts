import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, 'img/'+ name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error)
    )
  }

  getImages(){
    const imagesRef = ref(this.storage, 'img')
    list(imagesRef)
    .then(async response => {
      for (let item of response.items){
        this.url = await getDownloadURL(item);
      }
    })
    .catch(error => console.log(error))
    console.log("La url es:" + this.url);

  }
}

