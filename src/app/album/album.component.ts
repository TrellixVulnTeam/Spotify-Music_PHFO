import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicDataService } from "../music-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"],
})
export class AlbumComponent implements OnInit {
  album = {} as any;
  id = this.route.snapshot.params["id"];

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private data: MusicDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.data.getAlbumById(this.id).subscribe((data) => {
        this.album = data;
      });
    });
  }

  ngOnDestory() {
    this.sub.unsubscribe();
  }

  favClick(id: any) {
    this.data.addToFavourites(id).subscribe((data) => {
      if (data != null) {
        this.snackBar.open("Adding to Favourites...", "Done", {
          duration: 1500,
        });
      } else {
        this.snackBar.open("Unable to add song to Favourites", "Done", {
          duration: 1500,
        });
      }
    });
  }
}
