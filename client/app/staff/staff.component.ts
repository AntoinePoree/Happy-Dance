import { Component, Input } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';

import { BureauService } from '../services/bureau.service';
import { Bureau } from '../shared/models/bureau.model';
import { ProfService } from '../services/prof.service';
import { Prof } from '../shared/models/prof.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {

  bureau = new Bureau();
  bureaux: Bureau[] = [];
  prof = new Prof();
  profs: Prof[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private BureauService: BureauService,
    private ProfService: ProfService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getBureaux();

  }

  getBureaux() {
    this.BureauService.getBureaux().subscribe(
      // data => this.bureaux = data,
      (data) => {
        this.bureaux = data,
          console.log("bureaux", this.bureaux);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  getProfs() {
    this.ProfService.getProfs().subscribe(
      (data) => {
        this.profs = data,
          console.log("profs", this.profs);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}