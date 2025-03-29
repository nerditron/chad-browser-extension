import tippy, { Instance } from "tippy.js";
import * as _ from "lodash";

// Extend the tippy.js Instance type to include the methods we need
interface ExtendedTippyInstance extends Instance {
  updateTitleContent?: (content: Element | string) => void;
  setContent?: (content: Element | string) => void;
  destroy?: () => void;
  dispose?: () => void;
}

const getTT = _.memoize((element: HTMLInputElement): ExtendedTippyInstance => {
  return tippy(element, {
    placement: "bottom",
    allowHTML: true,
  }) as ExtendedTippyInstance;
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
  
  // Use setContent or updateTitleContent based on what's available
  if (typeof tt.setContent === 'function') {
    // tippy.js v6+ uses setContent
    tt.setContent(titleElement);
  } else if (typeof tt.updateTitleContent === 'function') {
    // Older versions use updateTitleContent
    tt.updateTitleContent(titleElement);
  }
  
  tt.show();
}

/**
 * Hides and disposes of the tooltip for a given input element.
 * @param element - The input element whose tooltip should be hidden.
 */
export function hideErrors(element: HTMLInputElement) {
  // Check if there's a tooltip instance for this element in the cache
  if (getTT.cache && getTT.cache.has(element)) {
    const tt = getTT(element);
    // Hide the tooltip first
    tt.hide();
    
    // Try to dispose if the method exists
    if (typeof tt.destroy === 'function') {
      // tippy.js v6+ uses destroy instead of dispose
      tt.destroy();
    } else if (typeof tt.dispose === 'function') {
      // Older versions of tippy.js use dispose
      tt.dispose();
    }
    
    // Remove from cache
    getTT.cache.delete(element);
  }
}
