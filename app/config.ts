export const CONFIG_FILE = process.env.CONFIG_FILE || "../config/config.js";
import { exit } from "process";
interface BaseConfig {
  redis: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

export class Config {
  private _config: BaseConfig;
  constructor() {
    this.load();    
  }
  private load = (path: string = CONFIG_FILE): void => {
    this._config = require(path) as BaseConfig;        
    if (this._config.redis === undefined) {
      console.error("Redis config missing");
      exit(1);
    }
  };
  get redis() {
    return this._config.redis;
  }
}