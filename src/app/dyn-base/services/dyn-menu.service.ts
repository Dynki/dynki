import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, Actions, ofActionDispatched, ofActionSuccessful } from '@ngxs/store';

import { MenuBuilder } from './dyn-menu.builder';
import { DynMenuItem, DynMenu } from '../store/menu.model';

import * as boardActions from '../../dyn-boards/store/board.actions';
import * as menuActions from '../store/menu.actions';

@Injectable()
export class MenuService {

  private userInfo: UserInfo;
  private collectionName: string;
  private menuCollection: string;

  constructor(
      private db: AngularFirestore,
      private afAuth: AngularFireAuth,
      private mb: MenuBuilder,
      private store: Store,
      private action$: Actions
    ) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionName = 'menu-folders::' + this.userInfo.uid ;
          this.menuCollection = 'menus::' + this.userInfo.uid ;
        });
   }

  getMenus(): Observable<DynMenu[]> {
    console.log('Menu::Service::getMenus');
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
    console.log('Menu::Service::getMenu');
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
    console.log('Menu::Service::getFolders');
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

  initialiseMenus() {
    this.initialiseMainMenu();
    this.initialiseNewBoardMenu();
  }

  initialiseMainMenu() {
    const newBoardBtn = {
      title: 'New Board',
      caption: '',
      icon: 'anticon anticon-plus',
      clickAction: new boardActions.ChooseBoardType()
    };

    const blankAddBtn = {
      title: '',
      caption: '',
      icon: 'anticon anticon-plus',
    };

    const items: DynMenuItem[] = [
      this.mb.setTitle('Inbox').setIcon('anticon anticon-mail').build(),
      this.mb.setTitle('Boards').setIcon('anticon anticon-dashboard').setButton(newBoardBtn).build(),
      this.mb.setTitle('Teams').setIcon('anticon anticon-appstore').setButton(blankAddBtn).build(),
      this.mb.setTitle('Projects').setIcon('anticon anticon-rocket').setButton(blankAddBtn).build(),
      this.mb.setTitle('Tags').setIcon('anticon anticon-tags').setButton(blankAddBtn).build()
    ]

    const menu = {
      title: 'Main menu',
      items: items
    }
    this.store.dispatch(new menuActions.LoadItems(menu));
  }

  initialiseNewBoardMenu() {
    const subMenuItems1 = [
      this.mb.setTitle('Start From Scratch').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('Scratch'),
        icon: undefined
      }).build(),
      this.mb.setTitle('Track Time').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('TimeTracking'),
        icon: undefined
      }).build(),
      this.mb.setTitle('Team Tasks').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('TeamTasks'),
        icon: undefined
      }).build(),
      this.mb.setTitle('Project Planning').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('ProjectPlanning'),
        icon: undefined
      }).build()
    ]
    const subMenuItems2 = [
      this.mb.setTitle('Sprint Planning').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('SprintPlanning'),
        icon: undefined
      }).build(),
    ]
    const subMenuItems3 = [
      this.mb.setTitle('Project Planning').setButton({
        caption: 'Select',
        title: 'Use this template',
        clickAction: new boardActions.CreateBoard('ProjectPlanning'),
        icon: undefined
      }).build(),
    ]

    const items = [
      this.mb.setTitle('Classic Templates').setSubmenu(subMenuItems1).build(),
      this.mb.setTitle('Software Development').setSubmenu(subMenuItems2).build(),
      this.mb.setTitle('Project Management').setSubmenu(subMenuItems3).build(),
    ]

    const menu = {
      id: null,
      title: 'Choose-Template',
      items: items
    }
    this.store.dispatch(new menuActions.LoadItems(menu));
  }

}
