export type BotAssignAction = {
  type: "Assign",
  data: {
    name: string,
    value: string | number | string[] | number[]
  }
}