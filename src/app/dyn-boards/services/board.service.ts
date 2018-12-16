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

  @Select(BaseState.domainId)
  private domainId$: Observable<string>;
  private domainId = undefined;

  constructor(private db: AngularFirestore, private action$: Actions, private store: Store, private afAuth: AngularFireAuth) {
    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
      .subscribe(() => {
        this.domainId = this.store.selectSnapshot(BaseState.domainId);
      });

      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
        });

   }

  async createBoard(type: string): Promise<Board> {
    console.log('Board::Service::CreateBoard');
      const data = JSON.parse(JSON.stringify(new Board('Task', type, '', this.userInfo)));
      const docRef = await this.db.collection('domains').doc(this.domainId).collection('boards').add(data);
      const newDoc = await this.db.collection('domains').doc(this.domainId).collection('boards').doc(docRef.id).get().toPromise();

      return Promise.resolve({ id: newDoc.id, ...newDoc.data() } as Board);
  }

  getBoards() {
    console.log('Board::Service::getBoards');
    return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as IBoards;
      })
    ).subscribe((boards: IBoards) => {
      this.store.dispatch(new boardActions.RefreshBoards(boards));
    })
  }

  getBoard(boardId: string) {
    console.log('Board::Service::getBoard ', boardId);
    return this.db.collection('domains').doc(this.domainId).collection('boards').doc(boardId).snapshotChanges()
    .subscribe(b => {
        if (b.payload.exists) {
          console.log('Board::Service::getBoard::b', b);
          const data = b.payload.data() as Board;
          const id = b.payload.id;

          this.store.dispatch(new boardActions.DisplayBoard({ id, ...data }));
        } else {
          return undefined;
        }
      });
  }

  updateBoardTitle(board: IBoard) {
    console.log('Board::Service::UpdateBoardTitle');
    return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').get().pipe(
      take(1),
      switchMap(b => {
        const boards = (b.data() as IBoards).boards;
        const boardIndex = boards.findIndex(f => f.id === board.id);

        if (boardIndex > -1) {
          boards[boardIndex].title = board.title;
        }

        return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set({ boards: boards })
      })
    );
  }

  attachBoard(board: IBoard) {
    console.log('Board::Service::AttachBoard');
    return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').get()
    .pipe(
      take(1),
      switchMap(b => {
        let boards;
        if (!b.exists) {
          boards = { id: 'appboards', boards: [board] };
          return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set(boards);
        } else {
          boards = b.data().boards;
          boards.push(board);
          return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set({ boards: boards });
        }
      }),
      switchMap(() => this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').get()),
      map(boards => boards.data() as IBoards)
    );
  }

  AddBoardFolder(boards: IBoards) {
    console.log('Board::Service::UpdateBoardTitle');
    const newFolder = { id: null, title: 'New Folder' } as Board;
    newFolder.isFolder = true;
    boards.boards.push(newFolder);
    this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').get().pipe(
      take(1)
    )
    .subscribe(b => {
      if (!b.exists) {
        this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set(boards);
      } else {
        this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set({ boards: boards.boards });
      }
    })
  }

  updateBoard(board: Board) {
    console.log('Board::Service::UpdateBoard', board);
    this.db.collection('domains').doc(this.domainId).collection('boards').doc(board.id).set(board);
  }

  updateBoards(boards: Board[]) {
    console.log('Board::Service::UpdateBoardTitle');
    this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set({ boards });
  }

  removeBoard(board: Board) {
    this.db.collection('domains').doc(this.domainId).collection('boards').doc(board.id).delete().then(() => {
      this.removeBoardTitle(board);
    })
    .catch(err => console.log('Board::Service::RemoveBoard::Error', err));
  }

  removeBoardTitle(board: Board) {
    this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').snapshotChanges().pipe(
        take(1)
    )
    .subscribe(b => {
        const existingBoards = b.payload.data() as IBoards;
        const updatedBoards = existingBoards.boards.filter(f => f.id !== board.id);
        existingBoards.boards = updatedBoards;
        this.store.dispatch(new boardActions.RefreshBoards(existingBoards));
        this.store.dispatch(new boardActions.SetCurrentBoard(existingBoards.boards[0]));
        this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').set({ boards: updatedBoards });
    })
  }

}
