import React, { useState } from "react";
import { Bot } from "../App";
import { BotAction } from "../BotActions";
import { BotAssignAction } from "../BotActions/BotAssignAction";
import { BotIfAction } from "../BotActions/BotIfAction";

type BotRunContext = {
  fieldValues: {
    currentHand: string[],
    communityCards: string[],
    [key: string]: string | number | string[] | number[]
  }
}

function runActions(actions: BotAction[], context: BotRunContext): BotRunContext {
  let nextContext: BotRunContext = {...context, fieldValues: {...context.fieldValues}};

  for(const action of actions) {
    switch (action.type) {
      case "If":
        nextContext = computeIfAction(action as BotIfAction, nextContext);
        break;
      case "Assign":
        nextContext = computeAssignAction(action as BotAssignAction, nextContext);
        break;
      default:
        break;
    }
  }

  return nextContext;
}

function computeIfAction(action: BotIfAction, context: BotRunContext): BotRunContext {
  let result = false;

  switch (action.data.operator) {
    case "lessThan":
      result = context.fieldValues[action.data.contextField] < action.data.value;
      break;
    case "greaterThan":
      result = context.fieldValues[action.data.contextField] > action.data.value;
      break;
    case "equalTo":
      result = context.fieldValues[action.data.contextField] === action.data.value;
      break;
    case "contains":
      const contextField = context.fieldValues[action.data.contextField];
      if (Array.isArray(contextField))
        result = (contextField as any[]).find((item: string | number) => item === action.data.value);
      else if (typeof contextField === "string")
        result = contextField.includes(action.data.value.toString());
      else
        result = contextField === action.data.value;
      break;
    default:
      return {...context, fieldValues: {...context.fieldValues}};
  }

  if (result) {
    return runActions(action.data.trueActions, context);
  } else if (action.data.falseActions) {
    return runActions(action.data.falseActions, context);
  }

  return {...context, fieldValues: {...context.fieldValues}};
}

function computeAssignAction(action: BotAssignAction, context: BotRunContext): BotRunContext {
  return {
    ...context,
    fieldValues: {
      ...context.fieldValues,
      [action.data.name]: action.data.value
    }
  };
}

export function BotRunner({bot, currentHand, communityCards}: { bot: Bot, currentHand: string[], communityCards: string[]}) {
  const [result, setResult] = useState<{name: string, value: string | number | string[] | number[]}[]>([]);

  function runBot() {
    const context: BotRunContext = {
      fieldValues: {
        currentHand,
        communityCards
      }
    }

    const actionResults = runActions(bot.actions, context);
    const fieldResults = [];
    for(const field in actionResults.fieldValues) {
      fieldResults.push({name: field, value: actionResults.fieldValues[field]});
    }

    setResult(fieldResults);
  }

  return (<>
    <button onClick={() => runBot()}>run bot</button>
    <div className="bot-results">
      <dl>
        {result.map(field => <>
          <dt>{field.name}</dt>
          <dd>{field.value}</dd>
        </>)}
      </dl>
    </div>
  </>)
}