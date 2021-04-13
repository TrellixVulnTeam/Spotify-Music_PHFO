import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { RegisterUser } from "../RegisterUser";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser;

  warning = "";
  success = false;
  loading = false;

  constructor(private auth: AuthService) {}

  onSubmit(f: NgForm) {
    if (
      this.registerUser.userName !== "" &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }
}
