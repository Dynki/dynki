import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Board, IBoard, IBoards } from '../store/board.model';
import { Observable, of, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable()
export class BoardService {

  private userInfo: UserInfo;
  private collectionName: string;
  private collectionAppName: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionAppName = 'app::' + this.userInfo.uid;
          this.collectionName = 'boards::' + this.userInfo.uid;
        });
   }

  createBoard(type: string): Promise<DocumentReference> {
    console.log('Board::Service::CreateBoard');
    const data = JSON.parse(JSON.stringify(new Board('Task', type, '', this.userInfo)));
    return this.db.collection(this.collectionName).add(data);
  }

  getBoards(): Observable<IBoards[]> {
    console.log('Board::Service::getBoards');
    return this.db.collection<IBoard>(this.collectionAppName).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data();
          const id = a.payload.id;
          return { id, ...data };
        })
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

  updateBoardTitle(boards: IBoards) {
    console.log('Board::Service::UpdateBoardTitle');
    this.db.collection(this.collectionAppName).doc(boards.id).set({ boards: boards.boards });
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
