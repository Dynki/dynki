import { Component, OnInit } from '@angular/core';
import { DynMenu } from '../store/menu.model';
import * as boardActions from '../../dyn-boards/store/board.actions';

@Component({
  selector: 'dyn-choose-board',
  templateUrl: './dyn-choose-board.component.html'
})
export class DynChooseBoardTypeComponent implements OnInit {

  menu: DynMenu;

  constructor() {
  }

  ngOnInit() {
    this.menu = {
      title: 'Choose Template',
      items: [{
        title: 'Classic Templates',
        expanded: true,
        folders: false,
        submenu: [{
          title: 'Start From Scratch',
          button: {
            caption: 'Select',
            title: 'Use this template',
            clickAction: new boardActions.CreateBoard('scratch'),
            icon: undefined
          },
          folders: false
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
        expanded: false,
        folders: false,
        submenu: [{
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
        expanded: false,
        folders: false,
        submenu: [{
          title: 'Project Planning',
          button: {
            caption: 'Select',
            title: 'Use this template',
            icon: undefined
          }
        }]
      }]
    }
  }
}
