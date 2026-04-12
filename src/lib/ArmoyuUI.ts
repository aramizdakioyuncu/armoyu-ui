import { ArmoyuApi } from "@armoyu/core";

/**
 * ArmoyuUI is the main entry point for the ARMOYU UI library.
 * It follows a Dependency Injection pattern, requiring an ArmoyuApi instance from @armoyu/core.
 */
export class ArmoyuUI {
  public readonly api: ArmoyuApi;
  public readonly version: string = "1.0.2";

  constructor(api: ArmoyuApi) {
    if (!api) {
      throw new Error("ArmoyuUI: ArmoyuApi instance is required in the constructor.");
    }
    this.api = api;
  }

  /**
   * Placeholder for future UI-specific configurations
   * (e.g. initial theme, language preference, component-specific defaults)
   */
  public getConfig() {
    return {
      version: this.version,
      // Add more config items here as the library grows
    };
  }
}
