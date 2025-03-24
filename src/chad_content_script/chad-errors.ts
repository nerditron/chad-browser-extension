import * as chad from "chad";
import { Options, OptionsConfig } from "../chad_options/options";

/**
 * Represents an error message returned by the Chad library.
 */
type ChadError = string;

/**
 * Analyzes the input text using the Chad library with user-defined configuration options from Chrome storage.
 * @param input - The text to analyze for far-left, woke language.
 * @returns A promise resolving to an array of error messages.
 */
export async function getChadErrors(input: string): Promise<ChadError[]> {
  try {
    const config: OptionsConfig = await Options.getOptions();
    const report = chad.text(input, config);
    const { messages } = report;
    return messages.map((message) => message.message);
  } catch (error) {
    console.error("Failed to retrieve Chad options or analyze text:", error);
    return [];
  }
}
