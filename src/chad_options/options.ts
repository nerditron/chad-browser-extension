/**
 * Configuration options for the Chad browser extension.
 */
export type OptionsConfig = {
  allow?: string[];
  deny?: string[];
  noBinary?: boolean;
};

/**
 * Storage keys for Chrome sync storage.
 */
const STORAGE_KEYS = {
  ALLOW: "CHAD_ALLOW",
  DENY: "CHAD_DENY",
  NO_BINARY: "CHAD_NO_BINARY",
};

/**
 * Default configuration values.
 */
const DEFAULT_OPTIONS: OptionsConfig = {
  allow: [],
  deny: [],
  noBinary: false,
};

/**
 * Validates that a value is a string array or undefined.
 * @param value - The value to validate.
 * @returns True if the value is a string array or undefined, false otherwise.
 */
function isStringArrayOrUndefined(value: unknown): value is string[] | undefined {
  if (value === undefined) return true;
  if (!Array.isArray(value)) return false;
  return value.every((item) => typeof item === "string");
}

/**
 * Validates that a value is a boolean or undefined.
 * @param value - The value to validate.
 * @returns True if the value is a boolean or undefined, false otherwise.
 */
function isBooleanOrUndefined(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

/**
 * Retrieves the Chad configuration options from Chrome storage.
 * @returns A promise resolving to the OptionsConfig object.
 */
function getOptions(): Promise<OptionsConfig> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      [STORAGE_KEYS.ALLOW, STORAGE_KEYS.DENY, STORAGE_KEYS.NO_BINARY],
      (result: { [key: string]: unknown }) => {
        const options: OptionsConfig = { ...DEFAULT_OPTIONS };

        // Validate and set 'allow'
        if (isStringArrayOrUndefined(result[STORAGE_KEYS.ALLOW])) {
          options.allow = result[STORAGE_KEYS.ALLOW] ?? DEFAULT_OPTIONS.allow;
        }

        // Validate and set 'deny'
        if (isStringArrayOrUndefined(result[STORAGE_KEYS.DENY])) {
          options.deny = result[STORAGE_KEYS.DENY] ?? DEFAULT_OPTIONS.deny;
        }

        // Validate and set 'noBinary'
        if (isBooleanOrUndefined(result[STORAGE_KEYS.NO_BINARY])) {
          options.noBinary = result[STORAGE_KEYS.NO_BINARY] ?? DEFAULT_OPTIONS.noBinary;
        }

        resolve(options);
      }
    );
  });
}

/**
 * Sets the Chad configuration options in Chrome storage.
 * @param options - The configuration options to save.
 * @returns A promise that resolves when the options are saved.
 */
function setOptions(options: OptionsConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const storageData: { [key: string]: unknown } = {};

    if (options.allow !== undefined) {
      if (!isStringArrayOrUndefined(options.allow)) {
        reject(new Error("Invalid 'allow' value: must be a string array"));
        return;
      }
      storageData[STORAGE_KEYS.ALLOW] = options.allow;
    }

    if (options.deny !== undefined) {
      if (!isStringArrayOrUndefined(options.deny)) {
        reject(new Error("Invalid 'deny' value: must be a string array"));
        return;
      }
      storageData[STORAGE_KEYS.DENY] = options.deny;
    }

    if (options.noBinary !== undefined) {
      if (!isBooleanOrUndefined(options.noBinary)) {
        reject(new Error("Invalid 'noBinary' value: must be a boolean"));
        return;
      }
      storageData[STORAGE_KEYS.NO_BINARY] = options.noBinary;
    }

    chrome.storage.sync.set(storageData, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

export const Options = {
  getOptions,
  setOptions,
};
