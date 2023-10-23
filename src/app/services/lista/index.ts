import { Injectable } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { UuidGeneratorService } from '../uuid-generator';
import { Firestore, collection, collectionData, setDoc, doc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { map } from 'rxjs'
import { mapToCanActivate } from '@angular/router';
import firebaseconfig from 'src/firebaseconfig';



@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private localStorageKey: string = 'listas';
  constructor(
    private _uuidService: UuidGeneratorService,
    private firestore: Firestore
  ) { }

  private _getFromStorage() {
    const listasStorage = localStorage.getItem(this.localStorageKey);

    return listasStorage ? JSON.parse(listasStorage) : {};
  }

  private _botadoFirestore() {
    const db = collection(this.firestore, this.localStorageKey);
    return getDocs(db);
  }

  private _saveIntoStorage(listas: {} = {}) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(listas));
  }

  private _salvaNoFirestore(lista: Lista) {
    const db = collection(this.firestore, this.localStorageKey)
    return setDoc(doc(db, lista.id), JSON.parse(JSON.stringify(lista)));
  }

  save(lista: Lista) {
    const model = new Lista(lista);
    if (!model.id) {
      model.id = this._uuidService.generateUuid();
    }

    this._salvaNoFirestore(model);

  }
/*
  remove(lista: Lista) {
    const model = new Lista(lista);
    const listasObj = this._getFromStorage();
    if (!model.id) {
      return;
    }

    delete listasObj[model.id];

    this._saveIntoStorage(listasObj);
  }
*/

  remove(lista: Lista) {
    const model = new Lista(lista);
    const db = collection(this.firestore, this.localStorageKey)
    if (!model.id) {
      return;
    }
    deleteDoc(doc(db, lista.id));
    this._salvaNoFirestore;
  }

  async getListas() {
    const listasObj = await this._botadoFirestore();
    return listasObj.docs.map((documento) => {
      return new Lista(documento.data());
    })
    /*
    const lista = listasObj.pipe(map((listaObj) => {
      return Object.keys(listaObj).map((key: any) => {
        return new Lista(listaObj[key]);
      });
    }))
    return lista;
    */
  }

}
