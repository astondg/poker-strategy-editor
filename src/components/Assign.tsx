import React, { ChangeEvent, useState } from "react";
import { BotActionData } from "../BotActions";
import { BotFieldType } from "../BotActions/BotFieldType";
import { useBotMetaProvider } from "../BotMetaContext";

import "./Assign.scss";

type AssignParams = {
  name: string,
  value: string | number | string[] | number[],
  onChange(data: BotActionData): void
}

export function Assign({name, value, onChange}: AssignParams) {
  const { fields, addCustomField, removeCustomField } = useBotMetaProvider();
  const contextField = fields[name];
  const [ localName, setLocalName ] = useState(name);
  const [ localValue, setLocalValue ] = useState(value);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const newName = event.currentTarget.value;
    if (newName === localName) return;

    setLocalName(newName);
    addCustomField(newName, getFieldTypeOfValue(localValue));
    removeCustomField(localName);
    onChange({ name: newName, value: localValue});
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setLocalValue(newValue);
    onChange({ name: localName, value: newValue});
  }

  function getInputTypeFromFieldType(type: BotFieldType): string {
    switch (type) {
      case "number":
        return "number";
      case "string":
      case "string[]":
      case "number[]":
      default:
        return "text";
    }
  }

  function getFieldTypeOfValue(_value: string | number | string[] | number[]): BotFieldType {
    // TODO - implement logic to return correct type
    return "number";
  }

  console.log('render', name);
  return (
    <div className="action action-assign">
      <div className="statement">
        <span className="action-syntax">let</span>
        <input type="text" placeholder="name" value={localName} onChange={handleNameChange} />
        <span className="action-syntax">=</span>
        <input type={getInputTypeFromFieldType(contextField?.type)} placeholder="value" value={localValue?.toString()} onChange={handleValueChange} />
      </div>
    </div>
  );
}