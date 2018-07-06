import { Component, OnInit } from '@angular/core';
import { DynMenu } from './dyn-menu.model';

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
        submenu: [{
          title: 'Start From Scratch',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        },
        {
          title: 'Track Time',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        },
        {
          title: 'Team Tasks',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        },
        {
          title: 'Project Planning',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        }]
      },
      {
        title: 'Software Development',
        expanded: false,
        submenu: [{
          title: 'Sprint Planning',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        }]
      },
      {
        title: 'Project Management',
        expanded: false,
        submenu: [{
          title: 'Project Planning',
          button: {
            caption: 'Select',
            title: 'Use this template'
          }
        }]
      }]
    }
  }
}
