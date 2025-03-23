import { getChadErrors } from "./chad-errors";
import { displayErrors, hideErrors } from "./display-errors";
import * as _ from "lodash";

/**
 * Listens for input events on text elements and triggers Chad analysis.
 * @param evt - The input event triggered by the user.
 */
async function chadListener(evt: Event) {
  const target = evt.target as HTMLInputElement;
  const text = target.value;

  const errors = await getChadErrors(text);
  if (errors.length === 0) {
    hideErrors(target);
  } else {
    displayErrors(errors, target);
  }
}

/**
 * Attaches the Chad listener to an input element.
 * @param input - The HTML input element to monitor.
 */
function addChadListener(input: HTMLInputElement) {
  input.addEventListener("input", chadListener);
}

/**
 * Retrieves all elements by tag name as an array.
 * @param tag - The HTML tag name to search for (e.g., "input", "textarea").
 * @returns An array of elements matching the tag name.
 */
function getAllElementsByTagName(tag: string): Element[] {
  const elements = document.getElementsByTagName(tag);
  return Array.from(elements);
}

/**
 * Retrieves all text input and textarea elements on the page.
 * @returns An array of HTML input elements (inputs and textareas).
 */
function getAllTextInputs(): HTMLInputElement[] {
  const inputs: Element[] = [];

  inputs.push(...getAllElementsByTagName("input"));
  inputs.push(...getAllElementsByTagName("textarea"));

  return inputs as HTMLInputElement[];
}

/**
 * Main function to initialize the Chad content script.
 * Attaches listeners to all text inputs on the page.
 */
function main() {
  const inputs = getAllTextInputs();
  inputs.forEach(addChadListener);
}

main();
