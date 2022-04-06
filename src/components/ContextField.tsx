import React from "react";
import { BotFieldType } from "../BotActions/BotFieldType";
import { useBotMetaProvider } from "../BotMetaContext";

// const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
// const cardSuits = ["H", "S", "C", "D"];
// const deck = cardSuits.flatMap(suit => cardValues.map(value => `${value}${suit}`));
// const deck = [
//   'H1', 'H2', 'H3',  'H4', 'H5', 'H6', 'H7',
//   'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
//   'S1', 'S2', 'S3',  'S4', 'S5', 'S6', 'S7',
//   'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
//   'C1', 'C2', 'C3',  'C4', 'C5', 'C6', 'C7',
//   'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
//   'D1', 'D2', 'D3',  'D4', 'D5', 'D6', 'D7',
//   'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA'
// ] as const;

// type Card = typeof deck[number];
// type PokerContext = {
//   currentHand: Card[],
//   tableCards: Card[]
// };

function getObjectKeys<T>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

export type PokerContextMeta = {
  [key: string]: {
    type: BotFieldType
  }
}

type ContextFieldParams = {
  selectedField: string
}

export function ContextField({selectedField}: ContextFieldParams) {
  const { fields } = useBotMetaProvider();

  return (
    <select value={selectedField}>
      {
        getObjectKeys(fields)
          .map(operator => {
            return <option key={operator} value={operator}>{operator}</option>;
          })
      }
    </select>
  );
}