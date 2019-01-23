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
          console.log("this dances", this.dances)
      },
    );
  }
}