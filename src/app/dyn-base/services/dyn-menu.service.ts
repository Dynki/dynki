import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuBuilder } from './dyn-menu.builder';
import { DynMenuItem } from '../store/menu.model';

@Injectable()
export class MenuService {

  private userInfo: UserInfo;
  private collectionName: string;

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth,
      private mb: MenuBuilder
    ) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionName = 'menu-folders::' + this.userInfo.uid ;
        });
   }

  createMenuFolder(itemName: string) {

    const folder = this.mb
    .setTitle('Folder 1')
    .setIsFolder(true)
    .setIsFolderOf(itemName)
    .setIcon('anticon anticon-folder-open')
    .build();

    const data = JSON.parse(JSON.stringify(folder));
    this.db.collection(this.collectionName).add(data);
  }

  getFolders(): Observable<DynMenuItem[]> {
    return this.db.collection<DynMenuItem>(this.collectionName).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as DynMenuItem;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  updateFolder(folder: DynMenuItem) {
    this.db.collection(this.collectionName).doc(folder.id).set(folder);
  }

  deleteFolder(folderId: string) {
    this.db.collection(this.collectionName).doc(folderId).delete();
  }
}
