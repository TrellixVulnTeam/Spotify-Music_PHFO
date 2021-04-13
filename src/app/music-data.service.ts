import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SpotifyTokenService } from "./spotify-token.service";
import { mergeMap } from "rxjs/operators";
import { environment } from "./../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MusicDataService {
  spotifyAPI: string = environment.spotifyAPIBase;
  userAPI: string = environment.userAPIBase;

  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    const url = `${this.spotifyAPI}/browse/new-releases`;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getArtistById(id: string): Observable<SpotifyApi.SingleArtistResponse> {
    const url = `${this.spotifyAPI}/artists/${id}`;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleArtistResponse>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(
    id: string
  ): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    const url = `${this.spotifyAPI}/artists/${id}/albums?include_groups=album,single&limit=50`;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumById(id: string): Observable<SpotifyApi.SingleAlbumResponse> {
    const url = `${this.spotifyAPI}/albums/${id}`;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleAlbumResponse>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(
    searchString: string
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    const url = `${this.spotifyAPI}/search?q=${searchString}&type=artist&limit=50`;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistSearchResponse>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  addToFavourites(id): Observable<any> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    const url = `${this.userAPI}/favourites/${id}`;

    return this.http.put<[any]>(url, {});
  }

  removeFromFavourites(id): Observable<any> {
    const url = `${this.userAPI}/favourites/${id}`;

    return this.http.delete<any>(url).pipe(
      mergeMap((favouritesArray) => {
        // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        return this.spotifyToken.getBearerToken().pipe(
          mergeMap((token) => {
            if (favouritesArray.data.length > 0) {
              const spotifyUrl = `${
                this.spotifyAPI
              }/tracks?ids=${favouritesArray.data.join(",")}`;

              return this.http.get<any>(spotifyUrl, {
                headers: { Authorization: `Bearer ${token}` },
              });
            } else {
              return new Observable((o) => o.next({ tracks: [] }));
            }
          })
        );
      })
    );
  }

  getFavourites(): Observable<any> {
    const url = `${this.userAPI}/favourites/`;

    return this.http.get<any>(url).pipe(
      mergeMap((favouritesArray) => {
        // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        console.log(favouritesArray);
        return this.spotifyToken.getBearerToken().pipe(
          mergeMap((token) => {
            if (favouritesArray.data.length > 0) {
              const spotifyUrl = `${
                this.spotifyAPI
              }/tracks?ids=${favouritesArray.data.join(",")}`;

              return this.http.get<any>(spotifyUrl, {
                headers: { Authorization: `Bearer ${token}` },
              });
            } else {
              return new Observable((o) => o.next({ tracks: [] }));
            }
          })
        );
      })
    );
  }
}
