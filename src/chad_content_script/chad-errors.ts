// Use the global chad object that will be available from our bundled chad-bundle.js
// The type definition ensures TypeScript knows what to expect
declare global {
  interface Window {
    chad: {
      text: (input: string, config?: any) => {
        messages: Array<{ message: string }>
      }
    }
  }
}

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
    const options: OptionsConfig = await Options.getOptions();
    
    // Create a sanitized config to avoid the "Do not provide both allow and deny" error
    const config: OptionsConfig = {};
    
    // The Chad library doesn't allow both allow and deny to be set simultaneously
    // Prioritize deny list if both are provided
    if (options.deny && options.deny.length > 0) {
      config.deny = options.deny;
    } else if (options.allow && options.allow.length > 0) {
      config.allow = options.allow;
    }
    
    // Copy other options
    if (options.noBinary !== undefined) {
      config.noBinary = options.noBinary;
    }
    
    // Use the global chad object that was exposed by chad-bundle.js
    const report = window.chad.text(input, config);
    const { messages } = report;
    return messages.map((message) => message.message);
  } catch (error) {
    console.error("Failed to retrieve Chad options or analyze text:", error);
    return [];
  }
}
