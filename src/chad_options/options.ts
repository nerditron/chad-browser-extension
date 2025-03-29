/// <reference types="web-ext-types" />

declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}

/**
 * Configuration options for the Chad browser extension.
 */
export type OptionsConfig = {
  allow?: string[];
  deny?: string[];
};

/**
 * Storage keys for Chrome sync storage.
 */
const STORAGE_KEYS = {
  ALLOW: "CHAD_ALLOW",
  DENY: "CHAD_DENY",
};

/**
 * Default configuration values.
 */
const DEFAULT_OPTIONS: OptionsConfig = {
  allow: [],
  deny: [],
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
 * Checks if the Chrome extension API is available.
 * @returns True if Chrome extension API is available, false otherwise.
 */
function isChromeExtensionEnvironment(): boolean {
  return typeof window !== 'undefined' && 
         typeof window.chrome !== 'undefined' && 
         typeof window.chrome.storage !== 'undefined' && 
         typeof window.chrome.storage.sync !== 'undefined';
}

/**
 * Retrieves the Chad configuration options from Chrome storage.
 * @returns A promise resolving to the OptionsConfig object.
 */
function getOptions(): Promise<OptionsConfig> {
  // If not in a Chrome extension environment, return default options
  if (!isChromeExtensionEnvironment()) {
    // console.warn('Chrome storage API not available. Using default options.');
    return Promise.resolve({ ...DEFAULT_OPTIONS });
  }

  return new Promise((resolve) => {
    window.chrome!.storage.sync.get(
      [STORAGE_KEYS.ALLOW, STORAGE_KEYS.DENY],
      (result: { [key: string]: unknown }) => {
        const options: OptionsConfig = { ...DEFAULT_OPTIONS };

        // Validate and set 'allow'
        if (isStringArrayOrUndefined(result[STORAGE_KEYS.ALLOW])) {
          options.allow = result[STORAGE_KEYS.ALLOW] as string[] ?? DEFAULT_OPTIONS.allow;
        }

        // Validate and set 'deny'
        if (isStringArrayOrUndefined(result[STORAGE_KEYS.DENY])) {
          options.deny = result[STORAGE_KEYS.DENY] as string[] ?? DEFAULT_OPTIONS.deny;
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
  // If not in a Chrome extension environment, just log and resolve
  if (!isChromeExtensionEnvironment()) {
    console.warn('Chrome storage API not available. Options not saved:', options);
    return Promise.resolve();
  }

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

    window.chrome!.storage.sync.set(storageData, () => {
      if (window.chrome!.runtime.lastError) {
        reject(new Error(window.chrome!.runtime.lastError.message));
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
