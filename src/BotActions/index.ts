export type BotActionType = "Assign" | "If";

export type BotActionData = {
  [key: string]: any
};

export interface BotAction {
  type: BotActionType,
  data: BotActionData
};