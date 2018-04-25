import {Component, OnInit} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {IUser} from "../model/i-user";

@Component({
  selector: "hlwt-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  user: IUser;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      return (this.user = user);
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logOut() {
    this.auth.logout();
  }
}
