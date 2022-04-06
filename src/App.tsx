import React, { ChangeEvent, useState } from 'react';
import { BotMetaProvider } from './BotMetaContext';
import { BotAction } from './BotActions';
import { ActionSelector } from './components/ActionSelector';
import { BotFieldType } from './BotActions/BotFieldType';

import "./App.scss";
import { BotRunner } from './components/BotRunner';

export type Bot = {
  customFields: {
    [key: string]: {
      type: BotFieldType
    }
  } 
  actions: BotAction[]
};

function getBot() {
  const bot: Bot = {
    customFields: {
      riskFactor: { type: "number" }
    },
    actions: [
      {
        type: 'Assign',
        data: { name: 'riskFactor', value: 0.5 }
      },
      {
        type: 'If',
        data: {
          contextField: 'currentHand',
          operator: 'contains',
          value: '6H',
          trueActions: [{
              type: 'Assign',
              data: { name: 'riskFactor', value: 0.2 }
            }]
        }
      }
    ]
  }
  return bot;
}

function App() {
  const [currentHand, setCurrentHand] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const bot = getBot();

  function handleCurrentHandChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentHand(event.target.value.split(','));
  }

  function handleCommunityCardsChange(event: ChangeEvent<HTMLInputElement>) {
    setCommunityCards(event.target.value.split(','));
  }

  return (
    <BotMetaProvider customFields={bot.customFields}>
      <div className="App">
        <div className="actions">
          {bot.actions.map(action => {
            return <ActionSelector action={action} />
          })}
        </div>
        <div className="run-panel">
          <div>
            <h2>try it</h2>
            <div className="bot-input">
              <span>current hand</span>
              <input type="text" onChange={handleCurrentHandChange} />
            </div>
            <div className="bot-input">
              <span>community cards</span>
              <input type="text" onChange={handleCommunityCardsChange} />
            </div>
            <BotRunner bot={bot} currentHand={currentHand} communityCards={communityCards} />
          </div>
        </div>
      </div>
    </BotMetaProvider>
  );
}

export default App;
