// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface JsonObject {
  [key: string]: JsonValue;
}

type JsonArray = JsonValue[];

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
