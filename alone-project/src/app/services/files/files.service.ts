import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  /**
  * Crée une promesse qui va retourner le fichier en base64
  *
  * @param {Event} event
  * @returns {Promise<string>}
  * @memberof FilesService
  */
  public handleUpload(event: Event): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         resolve(reader.result.toString());
      };
      reader.onerror = () => {
        return reject(this);
      }
    });
  }

}
