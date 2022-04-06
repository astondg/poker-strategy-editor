import React from "react";

const logicalOperators = {
  greaterThan: { displaySymbol: ">" },
  lessThan: { displaySymbol: "<" },
  equalTo: { displaySymbol: "===" },
  contains: { displaySymbol: "contains" }
};

function getObjectKeys<T>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

type LogicalOperatorSelectorProps = {
  selectedOperator: string
}

export function LogicalOperatorSelector({selectedOperator}: LogicalOperatorSelectorProps) {
  return (
    <select value={selectedOperator}>
      {
        getObjectKeys(logicalOperators)
          .map(operator => {
            return <option key={operator} value={operator}>{logicalOperators[operator].displaySymbol}</option>;
          })
      }
    </select>
  )
}