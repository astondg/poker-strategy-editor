import { useState } from "react";
import { BotAction, BotActionData } from "../BotActions";

export function useBotAction(action: BotAction) {
  const [botAction, setBotAction] = useState(action);

  function setActionData(data: BotActionData) {
    setBotAction({
      ...botAction,
      data
    })
  }

  return {
    botAction,
    setActionData
  }
}