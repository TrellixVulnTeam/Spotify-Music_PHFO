import { Component, OnInit } from "@angular/core";
import { User } from "../User";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User = {
    userName: "",
    password: "",
    _id: null,
  };

  warning: boolean;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    if (this.user.userName !== "" && this.user.password !== "") {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage.setItem("access_token", success.token);
          this.router.navigate(["/newReleases"], {});
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
          console.log(err);
        }
      );
    }
  }
}
