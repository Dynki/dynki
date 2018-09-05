import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';

import { Board, IBoard } from '../store/board.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BoardService {

  private userInfo: UserInfo;
  private collectionName: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionName = 'boards::' + this.userInfo.uid;
        });
   }

  createBoard(type: string) {
    const data = JSON.parse(JSON.stringify(new Board('Task', type, this.userInfo)));
    this.db.collection(this.collectionName).add(data);
  }

  getBoards(): Observable<IBoard[]> {
    console.log('Board::Service::getBoards');
    return this.db.collection<IBoard>(this.collectionName).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Board;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getBoard(boardId: string): AngularFirestoreDocument<IBoard> {
    console.log('Board::Service::getBoard');
    return this.db.collection<IBoard>(this.collectionName).doc(boardId);
  }
}
