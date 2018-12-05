import { AfterViewChecked, ChangeDetectorRef, Component  } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewChecked {

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}