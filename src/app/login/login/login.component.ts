import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from '../../services/data-s.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: any;
  loginForm!: FormGroup;
  validation={
    phoneRegex: /\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    emailPhone:/^(?:\d{10}|\w+@\w+\.\w{2,3})$/
   }
  constructor(
    private formBuilder: FormBuilder,
    private myRoute: Router,
    private dataService: DataService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginFormData();
   
  }


  private loginFormData() {
    this.loginForm = this.formBuilder.group({
      emailId: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55), Validators.pattern(this.validation.emailPhone)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });
  }
 
  onLogin() {
    let userData = this.loginForm.value;
    this.dataService.loginApi(userData).subscribe(
      (data) => this.logindialog(data),
      (err) => console.log(err)
    );
  }

  logindialog(data: any) {
    if (data.status === true) {
      this.loginData = data;
      this.authService.sendToken(this.loginData.accessToken);
      this.myRoute.navigateByUrl('/home');
    }
    if (data.status === false) {
      alert(data.message)
    }
  }
}

