export interface ModernArtEvent {
  type: 'start_game' | 'update_name' | 'step' | 'start_auction';
  params: any;
}

export enum AuctionType {
  OPEN = 'OPEN',
  HIDDEN = 'HIDDEN',
  // ONE_OFFER = 'ONE_OFFER',
  // FIXED = 'FIXED',
  // DOUBLE = 'DOUBLE',
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
  // secondPainting?: Painting;
  // fixedPrice?: number;
  highestBid?: number | null;
  highestBidder?: string | null;
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
    // for testing
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
