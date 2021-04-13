import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicDataService } from "../music-data.service";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;
  q: any;

  private subscription: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.q = params["q"];
      this.data.searchArtists(this.q).subscribe((data) => {
        this.results = data.artists.items.filter((artist) => {
          return artist.images.length > 0;
        });
      });
    });
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }
}
