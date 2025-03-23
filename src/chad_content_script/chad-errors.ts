import * as chad from "chad";

/**
 * Represents an error message returned by the Chad library.
 */
type ChadError = string;

/**
 * Analyzes the input text using the Chad library and returns an array of error messages.
 * @param input - The text to analyze for far-left, woke language.
 * @returns A promise resolving to an array of error messages.
 */
export async function getChadErrors(input: string): Promise<ChadError[]> {
  const report = chad.text(input);
  const { messages } = report;
  return messages.map(message => message.message);
}
