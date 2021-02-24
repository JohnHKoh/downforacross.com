export interface ModernArtEvent {
  type: 'start_game' | 'update_name' | 'step' | 'start_auction' | 'submit_bid';
  params: any;
}

export enum AuctionType {
  OPEN = 'OPEN',
  HIDDEN = 'HIDDEN',
  ONE_OFFER = 'ONE_OFFER',
  FIXED = 'FIXED',
  DOUBLE = 'DOUBLE',
}

export interface Painting {
  painter: string;
  id: number;
  auctionType: AuctionType;
}
export interface Auction {
  auctionType: AuctionType;
  auctioneer: string;
  painting: Painting;
  secondPainting?: Painting; // DOUBLE
  fixedPrice?: number; // FIXED
  highestBid?: number | null; // ONE_OFFER, HIDDEN, OPEN
  highestBidder?: string | null; // ONE_OFFER, HIDDEN, OPEN
  latestBidder?: number | null; // ONE_OFFER, FIXED
}
export interface ModernArtState {
  started: boolean;
  deck: Painting[];
  users: {
    [id: string]: {
      id: string;
      name: string;
      icon: string;
      cards: Painting[];
    };
  };
  roundIndex: number;
  roundStarted: boolean;
  currentAuction: Auction;
}

export const initialState: ModernArtState = {
  started: false,
  users: {},
  deck: [],
  roundIndex: 0,
  roundStarted: false,
  currentAuction: {
    auctionType: AuctionType.HIDDEN,
    auctioneer: 'cat',
    painting: {
      painter: 'sigrid',
      id: 1,
      auctionType: AuctionType.HIDDEN,
    },
    highestBid: null,
    highestBidder: null,
  },
};
