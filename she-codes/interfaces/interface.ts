export interface ArtistInfo {
  mbid: string;
  name: string;
  country: string | null;
  type: string | null;
  formed: string | null;
  disbanded: string | null;
  tags: string[];
  listeners: number;
  totalPlays: number;
  bio: string | null;
  imageUrl: string | null;
}

export interface Track {
  position: number;
  title: string;
  durationMs: number | null;
  durationStr: string | null;
  recordingMbid: string | null;
}

export interface Album {
  mbid: string;
  title: string;
  date: string | null;
  country: string | null;
  trackCount: number | null;
  tracks: Track[];
}

export interface TopTrack {
  rank: number;
  title: string;
  playCount: number;
  listeners: number;
  url: string;
  mbid: string | null;
}

export interface FullArtistData {
  artist: ArtistInfo;
  albums: Album[];
  topTracks: TopTrack[];
}

export interface MbArtist {
  id: string;
  name: string;
  country?: string;
  type?: string;
  score: number;
  tags?: { name: string; count: number }[];
  "life-span"?: { begin?: string; end?: string; ended?: boolean };
}

export interface MbRelease {
  id: string;
  title: string;
  date?: string;
  country?: string;
  "track-count"?: number;
}

export interface MbTrack {
  position: number;
  title: string;
  length?: number;
  recording?: { id: string };
}

export interface MbMedia {
  tracks?: MbTrack[];
}
