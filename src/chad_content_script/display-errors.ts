import Tooltip from "tooltip.js";
import * as _ from "lodash";

const getTT = _.memoize((element: HTMLInputElement) => {
  return new Tooltip(element, {
    placement: "bottom",
    html: true,
  });
});

/**
 * Constructs an HTML element containing the error messages for display in a tooltip.
 * Prefixes each error with "Chad Warning: " to align with Chad's purpose of flagging woke language.
 * @param errors - Array of error messages to display.
 * @returns An HTML span element with formatted error messages.
 */
function constructTitleElement(errors: string[]): HTMLElement {
  const element = document.createElement("span");
  const prefixedErrors = errors.map(error => `Chad Warning: ${error}`);
  const text = prefixedErrors.join("<br><br>");
  element.innerHTML = text;
  return element;
}

/**
 * Displays errors in a tooltip for a given input element.
 * @param errors - Array of error messages to show.
 * @param element - The input element to attach the tooltip to.
 */
export function displayErrors(errors: string[], element: HTMLInputElement) {
  const tt = getTT(element);
  const titleElement = constructTitleElement(errors);
  tt.updateTitleContent(titleElement);
  tt.show();
}

/**
 * Hides and disposes of the tooltip for a given input element.
 * @param element - The input element whose tooltip should be hidden.
 */
export function hideErrors(element: HTMLInputElement) {
  const tt = getTT(element);
  tt.dispose();
  getTT.cache.delete(element);
}
