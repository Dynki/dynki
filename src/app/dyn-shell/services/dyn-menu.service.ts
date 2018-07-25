import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';
import { Observable } from 'rxjs';

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
          this.collectionName = this.userInfo.uid + '-menu-folders';
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
    return this.db.collection<DynMenuItem>(this.collectionName).valueChanges();
  }
}
