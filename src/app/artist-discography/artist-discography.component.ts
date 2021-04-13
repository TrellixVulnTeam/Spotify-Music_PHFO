import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicDataService } from "../music-data.service";

@Component({
  selector: "app-artist-discography",
  templateUrl: "./artist-discography.component.html",
  styleUrls: ["./artist-discography.component.css"],
})
export class ArtistDiscographyComponent implements OnInit {
  albums = null;
  artist = {} as any;

  id = this.route.snapshot.params["id"];

  private subscription: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params["id"];

      this.data.getArtistById(this.id).subscribe((data) => {
        console.log(data);
        this.artist = data;
      });

      this.data.getAlbumsByArtistId(this.id).subscribe((data) => {
        console.log(data.items);

        this.albums = data.items.filter((item: any, i: any) => {
          return (
            data.items.findIndex((item2: any, j: any) => {
              return item.name === item2.name;
            }) === i
          );
        });
      });
    });
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}
