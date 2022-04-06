import React from "react";

type TypedInputProps = {
  value: string | number | string[] | number[]
}

export function TypedInput({value}: TypedInputProps) {
  return (
    <input type="text" value={value.toString()} />
  );
}