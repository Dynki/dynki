import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Team } from '../../store/models/team';

@Component({
    selector: 'dyn-teams',
    templateUrl: './dyn-team.component.html'
})

export class TeamComponent implements OnInit {
    displayedColumns = ['created', 'name'];
    errorMessage: string;
    loadingIndicator: Boolean = true;
    resultsLength = 0;
    teams: Team[];
    shouldOpen = false;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.getTeams();
    }

    teamClicked(team: Team) {
        this.shouldOpen = !this.shouldOpen;
    }

    getClass(index): any {
        const row = Math.ceil(index / 3);
        const col = Math.round((((index / 3) - row) + 1) * 3 );
        const classT = `row1`;

        return { [classT]: true };
    }

    getTeams() {
        // this.teamsService.getTeams()
        //     .subscribe((data: any) => {
        //         // this.dataSource.data = data;
        //         this.loadingIndicator = false;
        //         this.resultsLength = data.total_count;
        //         this.teams = data;
        //         return data;
        //     },
        //     error => this.errorMessage = <any>error);
    }

    onSelect(row: Team) {
        this.router.navigate(['/teams', row._id]);
    }

    addTeam() {
        this.router.navigate(['/teams', 'new']);
    }
}
