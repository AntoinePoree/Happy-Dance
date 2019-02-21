import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { DanceService } from '../services/dance.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dance } from '../shared/models/dance.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewChecked {
  dance = new Dance();
  dances: Dance[] = [];
  newArr;
  danceArr = [];
  constructor(public auth: AuthService,
    private changeDetector: ChangeDetectorRef,
    private danceService: DanceService, ) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  ngOnInit() {
    this.getDances();
  }

  getDances() {
    this.danceService.getDances().subscribe(
      (data) => {
        this.dances = data,
          this.getDancesNotInvisible(data)
      }
    );
  }

  getDancesNotInvisible(data) {
    // console.log("called getDancesNotInvisible", data);

    this.newArr = this.dances.map(function (elem) {
      return {
        id: elem._id,
        invisible: elem.invisible,
        name: elem.name
      };
    });
    for (let index = 0; index < this.newArr.length; index++) {
      const element = this.newArr[index];
      if (element.invisible === false) {
        this.danceArr.push(element)
        // console.log("danceArr",this.danceArr);
      } 
    }
  }
}