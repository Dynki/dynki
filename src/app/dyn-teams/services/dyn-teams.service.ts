
import {from as observableFrom,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { Team, TeamMember } from '../store/models/team';
import { LambdaUtil } from '../../shared/aws/labmda.util';
import { Utils } from '../../shared/utils';

declare var AWS;

@Injectable()
export class TeamService {

  constructor(
    private lambdaUtil: LambdaUtil,
  ) { }

  public createTeam(adminId: string, adminEmail: string, teamName: string): Observable<Team> {

    const member: TeamMember = {
      id: Utils.newGuid(),
      user_id: adminId,
      email: adminEmail,
      admin: true,
      createdBy: adminId,
      createdDate: Date.now.toString(),
      modifiedBy: adminId,
      modifiedDate: Date.now.toString()
    }

    const payload: Team = {
      id: Utils.newGuid(),
      name: teamName,
      members: [member],
      createdBy: adminId,
      createdDate: Date.now.toString(),
      modifiedBy: adminId,
      modifiedDate: Date.now.toString()
    };

    return observableFrom(this.lambdaUtil.constructLambda('post', 'teams', payload));
  }

  public getTeams(): Observable<Team[]> {
    const payload = {
      // user: this.auth.getUserId()
    };

    return observableFrom(this.lambdaUtil.constructLambda('get', 'teams', payload));
  }

  public getTeam(teamId: string): Observable<Team> {
    const payload = {
      // user: this.auth.getUserId(),
      team_id: teamId
    };

    return observableFrom(this.lambdaUtil.constructLambda('get', `teams/${teamId}`, payload));
  }

  public updateTeam(team: Team): Observable<Team> {
    const payload = team;

    return observableFrom(this.lambdaUtil.constructLambda('put', `teams/${team.id}`, payload));
  }

  public deleteTeam(teamId: string): Observable<Team> {
    const payload = {
      _id: teamId
    };

    return observableFrom(this.lambdaUtil.constructLambda('delete', `teams/${teamId}`, payload));
  }

  public addTeamMember(teamId: string, member: TeamMember): Observable<Team> {
    const payload = {
      // user: this.auth.getUserId(),
      team_id: teamId,
      member: member
    };

    return observableFrom(this.lambdaUtil.constructLambda('post', `teams/${teamId}/members`, payload));
  }

  public deleteTeamMember(teamId: string, memberId: string): Observable<Team> {
    const payload = {};

    return observableFrom(this.lambdaUtil.constructLambda('delete', `teams/${teamId}/members/${memberId}`, payload));
  }
}
