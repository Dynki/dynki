import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Board, IBoard, IBoards } from '../store/board.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.db.collection(this.collectionAppName).doc('appboards').get().subscribe(b => {
      if (!b.exists) {
        boards.id = 'appboards';
        this.db.collection(this.collectionAppName).doc('appboards').set(boards);
      } else {
        this.db.collection(this.collectionAppName).doc('appboards').set({ boards: boards.boards });
      }
    })
  }

  AddBoardFolder(boards: IBoards) {
    console.log('Board::Service::UpdateBoardTitle');
    const newFolder = { id: null, title: 'New Folder' } as Board;
    newFolder.isFolder = true;
    boards.boards.push(newFolder);

    this.db.collection(this.collectionAppName).doc('appboards').get().subscribe(b => {
      if (!b.exists) {
        this.db.collection(this.collectionAppName).doc('appboards').set(boards);
      } else {
        this.db.collection(this.collectionAppName).doc('appboards').set({ boards: boards.boards });
      }
    })
  }

  updateBoard(board: Board) {
    console.log('Board::Service::UpdateBoard');
    this.db.collection(this.collectionName).doc(board.id).set(board);
  }

  updateBoards(boards: Board[]) {
    console.log('Board::Service::UpdateBoardTitle');
    this.db.collection(this.collectionAppName).doc('appboards').set({ boards });
  }

  removeBoard(board: Board) {
    this.db.collection(this.collectionName).doc(board.id).delete().then(() => {
      this.removeBoardTitle(board);
    })
    .catch(err => console.log('Board::Service::RemoveBoard::Error', err));
  }

  removeBoardTitle(board: Board) {
    this.db.collection(this.collectionAppName).doc('appboards').snapshotChanges().subscribe(b => {
        const existingBoards = b.payload.data() as IBoards;
        const updatedBoards = existingBoards.boards.filter(f => f.id !== board.id);
        this.db.collection(this.collectionAppName).doc('appboards').set({ boards: updatedBoards });
    })
  }

}
