import React from "react";
import { BotAction } from "../BotActions";
import { ActionSelector } from "./ActionSelector";
import { ContextField } from "./ContextField";
import { LogicalOperatorSelector } from "./LogicalOperatorSelector";
import { TypedInput } from "./TypedInput";

import "./If.scss";

type IfParams = {
  contextField: string,
  operator: string,
  value: string | number | string[] | number[],
  trueActions: BotAction[],
  falseActions?: BotAction[]
}

export function If({contextField, operator, value, trueActions, falseActions}: IfParams) {
  return (
    <div className="action action-if">
      <div className="condition">
        <span className="action-syntax">if</span>
        <ContextField selectedField={contextField} />
        <LogicalOperatorSelector selectedOperator={operator} />
        <TypedInput value={value} />
      </div>
      <div className="sub-actions">
        {trueActions.map(action => {
          return <ActionSelector action={action} />
        })}
      </div>
      <div className="sub-actions">
        <div className="sub-condition">
          <span className="action-syntax">else</span>
        </div>
        {falseActions && falseActions.map(action => {
            return <ActionSelector action={action} />
          })
        }
        {!falseActions &&
          <button>add action</button>
        }
      </div>
    </div>
  );
}