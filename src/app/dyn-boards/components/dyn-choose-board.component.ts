import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DynMenu } from '../../dyn-base/store/menu.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import * as boardActions from '../store/board.actions';
import { Select, Store } from '@ngxs/store';
import * as menuActions from '../../dyn-base/store/menu.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'dyn-choose-board',
  templateUrl: './dyn-choose-board.component.html'
})
export class DynChooseBoardTypeComponent implements OnInit {

  @Select(MenuState.getMenu('Choose-Template'))
  public menu$: Observable<DynMenu>;
  public menu: DynMenu;

  constructor(private store: Store) {}

  ngOnInit() {
    this.menu$.pipe(
      take(1)
    ).subscribe(m => console.log('Menu!!!:::', m));

    this.menu = {
      title: 'Choose-Template',
      items: [{
        title: 'Classic Templates',
        foldersAllowed: true,
        items: [{
          title: 'Start From Scratch',
          button: {
            caption: 'Select',
            title: 'Use this template',
            clickAction: new boardActions.CreateBoard('Scratch'),
            icon: undefined
          }
        },
        {
          title: 'Track Time',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        },
        {
          title: 'Team Tasks',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        },
        {
          title: 'Project Planning',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        }]
      },
      {
        title: 'Software Development',
        items: [{
          title: 'Sprint Planning',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        }]
      },
      {
        title: 'Project Management',
        items: [{
          title: 'Project Planning',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        }]
      }]
    }
    this.store.dispatch(new menuActions.LoadItems(this.menu));
  }

}
