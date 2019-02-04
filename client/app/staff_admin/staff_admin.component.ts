import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';


import { BureauService } from '../services/bureau.service';
import { Bureau } from '../shared/models/bureau.model';
import { ProfService } from '../services/prof.service';
import { Prof } from '../shared/models/prof.model';

@Component({
  selector: 'app-staff_admin',
  templateUrl: './staff_admin.component.html',
  styleUrls: ['./staff_admin.component.css'],
})
export class StaffAdminComponent implements OnInit {

  bureau = new Bureau();
  bureaux: Bureau[] = [];
  prof = new Prof();
  profs: Prof[] = [];
  isLoading = true;
  isEditing = false;

  // addBureauForm: FormGroup;
  // name = new FormControl('', Validators.required);
  // surname = new FormControl('', Validators.required);
  // photo = new FormControl('');
  // resume = new FormControl('');

  // addProfForm: FormGroup;
  // nameprof = new FormControl('', Validators.required);
  // surnameprof = new FormControl('', Validators.required);
  // photoprof = new FormControl('');
  // resumeprof = new FormControl('');
  addBureauForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]), surname: new FormControl(null, [
      Validators.required
    ]),
    photo: new FormControl(),
    resume: new FormControl()
  });

  addProfForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]), surname: new FormControl(null, [
      Validators.required
    ]),
    photo: new FormControl(),
    resume: new FormControl()
  });

  filename: string;
  uploadOk: boolean;

  constructor(private BureauService: BureauService,
    private ProfService: ProfService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getBureaux();
    this.getProfs();

  }

  onFileUploaded = (filename) => {
    this.filename = filename;
    // console.log("filename",filename);
  }

  getBureaux() {
    this.BureauService.getBureaux().subscribe(
      (data) => {
        this.bureaux = data,
          console.log("this bureaux", this.bureaux)
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addBureau() {
    this.addBureauForm.value.photo = this.filename,
      this.BureauService.addBureau(this.addBureauForm.value).subscribe(
        (res) => {
          this.bureaux.push(res);
          console.log("bureaux", this.bureaux, "res", res)
          this.addBureauForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error),
      );
  }

  enableEditingBureau(bureau: Bureau) {
    this.isEditing = true;
    this.bureau = bureau;
  }

  cancelEditingBureau() {
    this.isEditing = false;
    this.bureau = new Bureau();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the bureaux to reset the editing
    this.getBureaux();
  }

  editBureau(bureau: Bureau) {
    bureau.photo = this.filename;
    this.BureauService.editBureau(bureau).subscribe(
      () => {
        this.isEditing = false;
        this.bureau = bureau;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteBureau(bureau: Bureau) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.BureauService.deleteBureau(bureau).subscribe(
        () => {
          const pos = this.bureaux.map(elem => elem._id).indexOf(bureau._id);
          this.bureaux.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }




  //Profs
  getProfs() {
    this.ProfService.getProfs().subscribe(
      (data) => {
        this.profs = data,
          console.log("this profs", this.profs)
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addProf() {
    this.addProfForm.value.photo = this.filename,
      this.ProfService.addProf(this.addProfForm.value).subscribe(
        (res) => {
          this.profs.push(res);
          // console.log("profs", this.profs,"res", res)
          this.addProfForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error),
      );
  }

  enableEditingProf(prof: Prof) {
    this.isEditing = true;
    this.prof = prof;
  }

  cancelEditingProf() {
    this.isEditing = false;
    this.prof = new Prof();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the profs to reset the editing
    this.getProfs();
  }

  editProf(prof: Prof) {
    prof.photo = this.filename;
    this.ProfService.editProf(prof).subscribe(
      () => {
        this.isEditing = false;
        this.prof = prof;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteProf(prof: Prof) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.ProfService.deleteProf(prof).subscribe(
        () => {
          const pos = this.profs.map(elem => elem._id).indexOf(prof._id);
          this.profs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
