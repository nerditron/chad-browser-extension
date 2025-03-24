import { Options, OptionsConfig } from "./options";

/**
 * References to form elements.
 */
const noBinaryCheckbox = document.getElementById("noBinary") as HTMLInputElement;
const allowInput = document.getElementById("allow") as HTMLInputElement;
const denyInput = document.getElementById("deny") as HTMLInputElement;

/**
 * Loads the current options into the form inputs.
 * @param options - The current configuration options.
 */
function loadOptionsIntoForm(options: OptionsConfig): void {
  noBinaryCheckbox.checked = options.noBinary ?? false;
  allowInput.value = options.allow?.join(", ") ?? "";
  denyInput.value = options.deny?.join(", ") ?? "";
}

/**
 * Saves the current form values to Chrome storage.
 */
async function saveOptions(): Promise<void> {
  try {
    const options: OptionsConfig = {
      noBinary: noBinaryCheckbox.checked,
      allow: allowInput.value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      deny: denyInput.value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };
    await Options.setOptions(options);
  } catch (error) {
    console.error("Failed to save options:", error);
    alert("Error saving options. Check the console for details.");
  }
}

/**
 * Event listener for input changes.
 */
function handleInputChange(): void {
  saveOptions();
}

/**
 * Initializes the options page by loading current options and setting up event listeners.
 */
async function main(): Promise<void> {
  try {
    const options = await Options.getOptions();
    loadOptionsIntoForm(options);

    noBinaryCheckbox.addEventListener("change", handleInputChange);
    allowInput.addEventListener("input", handleInputChange);
    denyInput.addEventListener("input", handleInputChange);
  } catch (error) {
    console.error("Failed to load options:", error);
    alert("Error loading options. Check the console for details.");
  }
}

main();
