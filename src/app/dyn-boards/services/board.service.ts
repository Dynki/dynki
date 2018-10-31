import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Board, IBoard, IBoards } from '../store/board.model';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import * as baseActions from '../../dyn-base/store/base.actions';
import * as boardActions from '../store/board.actions';

@Injectable()
export class BoardService {

  private userInfo: UserInfo;
  private collectionName: string;
  private collectionAppName: string;

  @Select(BaseState.domainId)
  private domainId$: Observable<string>;
  private domainId = undefined;

  constructor(private db: AngularFirestore, private action$: Actions, private store: Store, private afAuth: AngularFireAuth) {
    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
      .subscribe(() => {
        this.domainId = this.store.selectSnapshot(BaseState.domainId);
        console.log('Board::Service::DomainId::', this.domainId);
        this.collectionAppName = 'app::' + this.domainId;
        this.collectionName = 'boards::' + this.domainId;
      });

      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
        });
   }

  createBoard(type: string): Promise<DocumentReference> {
    console.log('Board::Service::CreateBoard');
    const data = JSON.parse(JSON.stringify(new Board('Task', type, '', this.userInfo)));
    return this.db.collection(this.collectionName).add(data);
  }

  getBoards(): Observable<IBoards[]> {
    console.log('Board::Service::getBoards::', this.collectionAppName);
    return this.db.collection<IBoard>(this.collectionAppName).snapshotChanges()
    .pipe(
      take(1),
      map(actions => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  getBoard(boardId: string): Observable<IBoard> {
    console.log('Board::Service::getBoard ', boardId);
    return this.db.collection<IBoard>(this.collectionName).doc(boardId).snapshotChanges()
    .pipe(
      take(1),
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

  updateBoardTitle(board: IBoard) {
    console.log('Board::Service::UpdateBoardTitle');
    return this.db.collection(this.collectionAppName).doc('appboards').get().pipe(
      take(1),
      switchMap(b => {
        const boards = (b.data() as IBoards).boards;
        const boardIndex = boards.findIndex(f => f.id === board.id);

        if (boardIndex > -1) {
          boards[boardIndex].title = board.title;
        }

        return this.db.collection(this.collectionAppName).doc('appboards').set({ boards: boards })
      })
    );
  }

  attachBoard(board: IBoard) {
    console.log('Board::Service::AttachBoard');
    return this.db.collection(this.collectionAppName).doc('appboards').get()
    .pipe(
      take(1),
      switchMap(b => {
        let boards;
        if (!b.exists) {
          boards = { id: 'appboards', boards: [board] };
          return this.db.collection(this.collectionAppName).doc('appboards').set(boards);
        } else {
          boards = b.data().boards;
          boards.push(board);
          return this.db.collection(this.collectionAppName).doc('appboards').set({ boards: boards });
        }
      }),
      switchMap(() => this.db.collection(this.collectionAppName).doc('appboards').get()),
      map(boards => boards.data())
    );
  }

  AddBoardFolder(boards: IBoards) {
    console.log('Board::Service::UpdateBoardTitle');
    const newFolder = { id: null, title: 'New Folder' } as Board;
    newFolder.isFolder = true;
    boards.boards.push(newFolder);

    this.db.collection(this.collectionAppName).doc('appboards').get().pipe(
      take(1)
    )
    .subscribe(b => {
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
    this.db.collection(this.collectionAppName).doc('appboards').snapshotChanges().pipe(
        take(1)
    )
    .subscribe(b => {
        const existingBoards = b.payload.data() as IBoards;
        const updatedBoards = existingBoards.boards.filter(f => f.id !== board.id);
        existingBoards.boards = updatedBoards;
        this.store.dispatch(new boardActions.RefreshBoards(existingBoards));
        this.store.dispatch(new boardActions.SetCurrentBoard(existingBoards.boards[0]));
        this.db.collection(this.collectionAppName).doc('appboards').set({ boards: updatedBoards });
    })
  }

}
