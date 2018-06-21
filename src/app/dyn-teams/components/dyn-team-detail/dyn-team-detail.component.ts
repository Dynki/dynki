import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';



import { Team } from '../../store/models/team';

@Component({
  selector: 'dyn-team-detail',
  templateUrl: './dyn-team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  team: Team;
  teamId: String;
  result: any;
  teamForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.createForm();

    // this.route.params
    //   .switchMap((params: Params) => this.service.getTeam(params['id']))
    //   .subscribe((team: Team) => {
    //     this.team = team;

    //     this.teamForm.patchValue({
    //       name: this.team.name
    //     });
    //   });
  }

  createForm() {
    this.teamForm = this.fb.group({
      name: ''
    });
  }

  saveTeam() {
    const formModel = this.teamForm.value;
    this.team.name = formModel.name as string;
    // this.service.updateTeam(this.team).subscribe(() => this.router.navigate(['/teams']));
  }

  deleteTeam() {
    // this.dialogService.confirm('Confirm Delete', 'Delete this team, are you sure?')
    //   .subscribe(result => {
    //     if (result) {
    //       this.service.deleteTeam(this.team._id).subscribe(() => this.router.navigate(['/teams']));
    //     }
    //   });
  }
}
