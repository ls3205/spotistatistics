interface TopArtistsDataReturn {
    href: string;
    items: Artist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

interface Artist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface TopTracksDataReturn {
    href: string;
    items: Song[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

interface Song {

}