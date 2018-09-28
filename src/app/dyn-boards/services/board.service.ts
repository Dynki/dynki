import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
    console.log('Board::Service::CreateBoard');
    const data = JSON.parse(JSON.stringify(new Board('Task', type, '', this.userInfo)));
    this.db.collection(this.collectionName).add(data);
  }

  getBoards(): Observable<IBoard[]> {
    console.log('Board::Service::getBoards');
    return this.db.collection<IBoard>(this.collectionName).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as Board;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  getBoard(boardId: string): Observable<IBoard> {
    console.log('Board::Service::getBoard ', boardId);
    return this.db.collection<IBoard>(this.collectionName).doc(boardId).snapshotChanges()
    .pipe(
      map(b => {
        if (b.payload.exists) {
          console.log('Board::Service::getBoard::b', b);
          const data = b.payload.data() as Board;
          const id = b.payload.id;

          return { id, ...data };
        } else {
          return undefined;
        }
      })
    );
  }

  updateBoard(board: Board) {
    console.log('Board::Service::UpdateBoard');
    this.db.collection(this.collectionName).doc(board.id).set(board);
  }

  removeBoard(board: Board) {
    this.db.collection(this.collectionName).doc(board.id).delete()
    .catch(err => console.log('Board::Service::RemoveBoard::Error', err));
  }

}
