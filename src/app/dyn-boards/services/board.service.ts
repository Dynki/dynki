import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase';

import { Board, IBoard } from '../store/board.model';
import { Observable } from 'rxjs';

@Injectable()
export class BoardService {

  private userInfo: UserInfo;
  private collectionName: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
          this.collectionName = this.userInfo.uid + '-boards';
        });
   }

  createBoard(type: string) {
    const data = JSON.parse(JSON.stringify(new Board('Task', this.userInfo)));
    this.db.collection(this.collectionName).add(data);
  }

  getBoards(): Observable<IBoard[]> {
    return this.db.collection<IBoard>(this.collectionName).valueChanges();
  }

  getBoard(boardId: string): Observable<IBoard[]> {
    return this.db.collection<IBoard>(this.collectionName, ref => ref.where('id', '==', boardId)).valueChanges();
  }
}