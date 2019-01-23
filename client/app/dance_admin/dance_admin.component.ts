import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { DanceService } from '../services/dance.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dance } from '../shared/models/dance.model';

@Component({
  selector: 'app-dance_admin',
  templateUrl: './dance_admin.component.html',
  styleUrls: ['./dance_admin.component.css'],
})
export class DancesAdminComponent implements OnInit {

  dance = new Dance();
  dances: Dance[] = [];
  isLoading = true;
  isEditing = false;

  addDanceForm: FormGroup;
  name = new FormControl('', Validators.required);
  picture = new FormControl('');
  // galerie = new FormControl('');
  text = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  filename: string;
  uploadOk: boolean;

  constructor(private danceService: DanceService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getDances();
    this.addDanceForm = this.formBuilder.group({
      name: this.name,
      picture: this.picture,
      text: this.text,
      // galerie: this.galerie,
      description: this.description,
    });
  }

  onFileUploaded = (filename) => {
    this.filename = filename;
    // console.log("filename",filename);
  }

  getDances() {
    this.danceService.getDances().subscribe(
      (data) => 
        this.dances = data,
          // console.log("this dances", this.dances)},
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addDance() {
    this.addDanceForm.value.picture = this.filename,
      this.danceService.addDance(this.addDanceForm.value).subscribe(
        (res) => {
          this.dances.push(res);
          // console.log("dances", this.dances,"res", res)
          this.addDanceForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error),
      );
  }

  enableEditing(dance: Dance) {
    this.isEditing = true;
    this.dance = dance;
  }

  cancelEditing() {
    this.isEditing = false;
    this.dance = new Dance();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dances to reset the editing
    this.getDances();
  }

  editDance(dance: Dance) {
    dance.picture = this.filename;
    this.danceService.editDance(dance).subscribe(
      () => {
        this.isEditing = false;
        this.dance = dance;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteDance(dance: Dance) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.danceService.deleteDance(dance).subscribe(
        () => {
          const pos = this.dances.map(elem => elem._id).indexOf(dance._id);
          this.dances.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
