import { Component, OnInit } from "@angular/core";
import { MusicDataService } from "../music-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.css"],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any>;

  constructor(
    private data: MusicDataService,
    public snackBar: MatSnackBar
  ) {}

  private subscription: any;

  removeFromFavourites(id: any) {
    this.data.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  ngOnInit(): void {
    this.data.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}
