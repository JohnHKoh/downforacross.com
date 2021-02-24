import _ from 'lodash';
// @ts-ignore
import pseudoRandom from 'pseudo-random';
import {ModernArtState, ModernArtEvent, AuctionType, Painting} from './types';

export const modernArtReducer = (state: ModernArtState, event: ModernArtEvent): ModernArtState => {
  if (event.type === 'start_game') {
    return {
      ...state,
      started: true,
    };
  }
  if (event.type === 'submit_bid') {
    if (event.params.bidValue > state.currentAuction.highestBid!) {
      return {
        ...state,
        currentAuction: {
          ...state.currentAuction,
          highestBidder: event.params.userId,
          highestBid: event.params.bidValue,
        },
      };
    }
  }
  if (event.type === 'update_name') {
    return {
      ...state,
      users: {
        ...state.users,
        [event.params.id]: {
          // @ts-ignore
          cards: [],
          ...state.users[event.params.id],
          name: event.params.name,
          icon: event.params.icon,
          id: event.params.id,
        },
      },
    };
  }

  if (event.type === 'step') {
    // do the next automated step depending on the game state
    if (!state.roundStarted) {
      const CARDS_TO_DEAL: Record<string, number[] | undefined> = {
        // TODO
        1: [10, 10, 10],
        2: [10, 10, 10],
        3: [10, 10, 10],
        4: [10, 5, 3],
      };
      const cardsToDeal = CARDS_TO_DEAL[`${_.size(state.users)}`]?.[state.roundIndex] ?? 0;
      const auctionTypes = _.values(AuctionType);

      const colors = ['red', 'blue', 'yellow', 'green', 'purple'];
      const ALL_CARDS: Painting[] = _.flatMap(colors, (color, i) =>
        auctionTypes.map((auctionType, j) => ({
          painter: color,
          auctionType,
          id: i * auctionTypes.length + j,
        }))
      );
      let deck = [...ALL_CARDS];
      // for (let i = 0; i < deck.length; i += 1) {
      //   const j = Math.floor(prng.random() * (i + 1));
      //   console.log(i, j);
      //   const tmp = deck[j];
      //   deck[j] = deck[i];
      //   deck[i] = tmp;
      // }
      const deal = () => {
        const res = deck[0];
        deck = deck.slice(1);
        return res;
      };

      return {
        ...state,
        deck,
        users: _.mapValues(state.users, (user) => ({
          ...user,
          cards: [...user.cards, ..._.times(cardsToDeal, deal)],
        })),
        roundStarted: true,
      };
    }
  }

  if (event.type === 'start_auction') {
    const cards = state.users[event.params.userId].cards;
    const card = cards[event.params.idx];
    return {
      ...state,
      users: {
        ...state.users,
        [event.params.userId]: {
          ...state.users[event.params.userId],
          cards: _.without(cards, card),
        },
      },
      currentAuction: {
        auctionType: card.auctionType as AuctionType,
        auctioneer: event.params.userId,
        painting: card,
      },
    };
    // pass
  }
  return state;
};
