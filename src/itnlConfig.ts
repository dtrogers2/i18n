import Logger from '@mazemasterjs/logger';

const log = Logger.getInstance();

export class itnlConfig {
  /**
   * Instantiate and/or returns class instance
   */
  public static getInstance(): itnlConfig {
    if (this.instance === undefined) {
      this.instance = new itnlConfig();
    }

    return this.instance;
  }

  // singleton instance reference
  private static instance: itnlConfig;

  public readonly HTTP_PORT_INTL: number;
  public readonly BASE_URL_INTL: string;
  public readonly LOG_LEVEL: number;

  // singleton pattern - constructor is private, use static Config.getInstance()
  private constructor() {
    this.LOG_LEVEL = this.getVar('LOG_LEVEL', 'number');
    log.LogLevel = this.LOG_LEVEL;
    this.BASE_URL_INTL = this.getVar('BASE_URL_INTL', 'string');
    this.HTTP_PORT_INTL = this.getVar('HTTP_PORT_INTL', 'number');
  }

  /**
   * Gets and returns the value of the requested environment variable
   * as the given type.
   *
   * @param varName - the name of the environment variable to get
   * @param typeName - tye name of the type to return the value as (string | number)
   */
  private getVar = (varName: string, typeName: string): any => {
    const val = process.env[varName];

    // first see if the variable was found - if not, let's blow this sucker up
    if (val === undefined) {
      this.doError(`getVar(${varName}, ${typeName})`, 'Configuration Error', `Environment variable not set: ${varName}`);
    }

    // we have a value - log the good news
    log.info(__filename, `getVar(${varName}, ${typeName})`, `${varName}=${val}`);

    // convert to expect type and return
    switch (typeName) {
      case 'string': {
        return val;
      }
      case 'number': {
        return parseInt(val + '', 10); // this could blow up, but that's ok since we'd want it to
      }
      default: {
        // we only want numbers or strings...
        this.doError(`getVar(${varName}, ${typeName})`, 'Argument Error', `Invalid variable type name: ${typeName}. Try 'string' or 'number' instead.`);
      }
    }
  };

  /**
   * Wrapping log.error to clean things up a little
   *
   * @param method
   * @param title
   * @param message
   */
  private doError(method: string, title: string, message: string) {
    const err = new Error(message);
    log.error(__filename, method, title + ' ->', err);
    throw err;
  }
}

export default itnlConfig;