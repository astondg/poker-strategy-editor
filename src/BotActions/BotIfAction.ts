import { BotAction } from ".";

export type BotIfAction = {
  type: "If",
  data: {
    contextField: string,
    operator: string,
    value: string | number | string[] | number[]
    trueActions: BotAction[],
    falseActions?: BotAction[]
  }
}