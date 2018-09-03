import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DynMenu } from '../../dyn-base/store/menu.model';
import { MenuState } from '../../dyn-base/store/menu.state';
import * as boardActions from '../store/board.actions';
import { Select, Store } from '@ngxs/store';
import * as menuActions from '../../dyn-base/store/menu.actions';
import { take } from 'rxjs/operators';
import { MenuBuilder } from '../../dyn-base/services/dyn-menu.builder';

@Component({
  selector: 'dyn-choose-board',
  templateUrl: './dyn-choose-board.component.html'
})
export class DynChooseBoardTypeComponent implements OnInit {

  @Select(MenuState.getMenu('Choose-Template'))
  public menu$: Observable<DynMenu>;
  public menu: DynMenu;

  constructor(private store: Store, public mb: MenuBuilder) { }

  ngOnInit() {
    this.menu$.pipe(
      take(1)
    ).subscribe(m => console.log('Menu!!!:::', m));

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

    this.menu = {
      id: null,
      title: 'Choose-Template',
      items: items
    }

    this.store.dispatch(new menuActions.LoadItems(this.menu));
  }

}
