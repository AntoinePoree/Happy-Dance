import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DanceService } from '../services/dance.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dance } from '../shared/models/dance.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dance_id',
  templateUrl: './dance_id.component.html',
  styleUrls: ['./dance_id.component.css'],
})
export class DanceIDComponent {

  dance = new Dance();
  id: any;
  picture1;
  picture2;
  picture3;
  galerie;
  isLoading = true;

  constructor(private danceService: DanceService,
    private route: ActivatedRoute,
    public toast: ToastComponent) { }

  ngOnInit() {
    // console.log("route",this.route);
    this.id = this.route.snapshot.paramMap.get('id'),
      this.getDance();
  }

  getDance() {
    this.danceService.getDance(this.id).subscribe(
      data => {
        this.dance = data,
        this.picture1 = "api/file/" + this.dance.picture1
        this.picture2 = "api/file/" + this.dance.picture2
        this.picture3 = "api/file/" + this.dance.picture3
      }
    );
  }
}