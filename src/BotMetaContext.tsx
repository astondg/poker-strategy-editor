import React, { ReactNode, useState } from "react";
import { BotFieldType } from "./BotActions/BotFieldType";

type BotMeta = {
  fields: {
    [key: string]: {
      type: BotFieldType
    }
  },
  addCustomField: (name: string, type: BotFieldType) => void,
  removeCustomField: (name: string) => void
};

const systemFields = {
  currentHand: { type: "string[]" as BotFieldType },
  communityCards: { type: "string[]" as BotFieldType }
}
const BotMetaContext = React.createContext<BotMeta>({fields: systemFields, addCustomField: () => {}, removeCustomField: () => {}});

type CustomFields = {
  [key: string]: {
    type: BotFieldType
  }
};
type BotMetaProviderParams = {
  customFields: CustomFields,
  children: ReactNode
}

export function BotMetaProvider({customFields, children}: BotMetaProviderParams) {
  const [fields, setFields] = useState<CustomFields>({ ...customFields, ...systemFields });

  function addCustomField(name: string, type: BotFieldType) {
    console.log('add setFields', fields);
    setFields(currentFields => { return { ...currentFields, [name]: { type }, ...systemFields }; });
  }
  function removeCustomField(name: string) {
    console.log('remove setFields');
    setFields(currentFields => {
      const { [name]: ommitted, ...updatedFields } = currentFields;
      return { ...updatedFields, ...systemFields };
    });
  }

  return (
    <BotMetaContext.Provider value={{ fields, addCustomField, removeCustomField }}>
      {children}
    </BotMetaContext.Provider>
  );
}

export const useBotMetaProvider = () => React.useContext(BotMetaContext);
