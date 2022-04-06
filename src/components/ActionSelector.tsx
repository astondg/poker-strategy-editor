import React from "react";
import { Assign } from './Assign';
import { If } from './If';
import { BotAction, BotActionData } from "../BotActions";
import { useBotAction } from "./useBotActions";
import { BotIfAction } from "../BotActions/BotIfAction";
import { BotAssignAction } from "../BotActions/BotAssignAction";

type ActionSelectorParams = {
  action: BotAction
}

export function ActionSelector({ action }: ActionSelectorParams) {
  const { setActionData } = useBotAction(action);

  function handleActionChange(data: BotActionData) {
    setActionData(data);
  }

  switch (action.type) {
    case 'If':
      return <If {...(action as BotIfAction).data} />;
    case 'Assign':
    default:
      return <Assign {...(action as BotAssignAction).data} onChange={handleActionChange} />;
  }
}