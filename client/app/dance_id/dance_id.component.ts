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
  firstText;
  secondText;

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
        this.dance = data
        
        if (this.dance.picture1 !== "") {
          this.picture1 = "api/file/" + this.dance.picture1
        }
        if (this.dance.picture2 !== "") {
          this.picture2 = "api/file/" + this.dance.picture2
        }
        if (this.dance.picture3 !== "") {
          this.picture3 = "api/file/" + this.dance.picture3
        }
        if (this.dance.text) {
          this.firstText = this.dance.text
        }
        if (this.dance.description) {
          this.secondText = this.dance.description
        }
        
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}