import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Team, TeamMember } from '../store/models/team';
import { LambdaUtil } from 'app/shared/aws/labmda.util';
import { Utils } from 'app/shared/utils';

declare var AWS;

@Injectable()
export class TeamService {

  constructor(
    private lambdaUtil: LambdaUtil,
  ) { }

  public createTeam(adminId: string, adminEmail: string, teamName: string): Observable<Team> {

    const member: TeamMember = {
      _id: Utils.newGuid(),
      user_id: adminId,
      email: adminEmail,
      admin: true,
      createdBy: adminId,
      createdDate: Date.now.toString(),
      modifiedBy: adminId,
      modifiedDate: Date.now.toString()
    }

    const payload: Team = {
      _id: Utils.newGuid(),
      name: teamName,
      members: [member],
      createdBy: adminId,
      createdDate: Date.now.toString(),
      modifiedBy: adminId,
      modifiedDate: Date.now.toString()
    };

    return Observable.fromPromise(this.lambdaUtil.constructLambda('post', 'teams', payload));
  }

  public getTeams(): Observable<Team[]> {
    const payload = {
      // user: this.auth.getUserId()
    };

    return Observable.fromPromise(this.lambdaUtil.constructLambda('get', 'teams', payload));
  }

  public getTeam(teamId: string): Observable<Team> {
    const payload = {
      // user: this.auth.getUserId(),
      team_id: teamId
    };

    return Observable.fromPromise(this.lambdaUtil.constructLambda('get', `teams/${teamId}`, payload));
  }

  public updateTeam(team: Team): Observable<Team> {
    const payload = team;

    return Observable.fromPromise(this.lambdaUtil.constructLambda('put', `teams/${team._id}`, payload));
  }

  public deleteTeam(teamId: string): Observable<Team> {
    const payload = {
      _id: teamId
    };

    return Observable.fromPromise(this.lambdaUtil.constructLambda('delete', `teams/${teamId}`, payload));
  }

  public addTeamMember(teamId: string, member: TeamMember): Observable<Team> {
    const payload = {
      // user: this.auth.getUserId(),
      team_id: teamId,
      member: member
    };

    return Observable.fromPromise(this.lambdaUtil.constructLambda('post', `teams/${teamId}/members`, payload));
  }

  public deleteTeamMember(teamId: string, memberId: string): Observable<Team> {
    const payload = {};

    return Observable.fromPromise(this.lambdaUtil.constructLambda('delete', `teams/${teamId}/members/${memberId}`, payload));
  }
}
