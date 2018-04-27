import {Component} from "@angular/core";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: "hlwt-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("routerAnimation", [
      transition("* <=> *", [
        query(":enter", [style({ opacity: 0 })], { optional: true }),
        group([
          query(":leave", [animate(300, style({ opacity: 0 }))], {
            optional: true
          }),
          query(
            ":enter",
            [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = "Have List Will Travel <3";

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
