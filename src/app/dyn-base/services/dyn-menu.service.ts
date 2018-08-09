import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuBuilder } from './dyn-menu.builder';
import { DynMenuItem, DynMenu } from '../store/menu.model';

@Injectable()
export class MenuService {

  private userInfo: UserInfo;
  private collectionName: string;
  private menuCollection: string;

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth,
      private mb: MenuBuilder
    ) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionName = 'menu-folders::' + this.userInfo.uid ;
          this.menuCollection = 'menus::' + this.userInfo.uid ;
        });
   }

  getMenus(): Observable<DynMenu[]> {
    return this.db.collection<DynMenu>(this.menuCollection).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as DynMenu;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMenu(menuId: string): Observable<DynMenu> {
    return this.db.collection<DynMenu>(this.menuCollection).doc(menuId).snapshotChanges()
    .pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as DynMenu;
          const id = action.payload.id;
          return { id, ...data };
        }
      })
    )
  }

  saveMenu(menu: DynMenu): Promise<DocumentReference> {
    const data = JSON.parse(JSON.stringify(menu));
    return this.db.collection(this.menuCollection).add(data);
  }

  createMenuFolder(itemName: string) {

    const folder = this.mb
    .setTitle('Folder 1')
    .setIsFolder(true)
    .setFoldersAllowed(true)
    .setParent(itemName)
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
