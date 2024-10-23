import { exit } from "process";
import { RedisClientType, RedisClusterType, RedisClusterOptions, createClient, createCluster } from "@redis/client";
import { Config } from "./config";

export class RedisService {
  //private redis: RedisClientType;
  private redis: RedisClusterType;

  constructor(private config: Config) {
    const options: RedisClusterOptions = {
      rootNodes: [
        {
          url: "rediss://" + this.config.redis.host + ":" + this.config.redis.port,
        },
      ],
      defaults: {
        username: this.config.redis.username,
        password: this.config.redis.password,
        socket: {
          tls: false,
        },
      },
    };
    //this.redis = createClient(options);
    this.redis = createCluster(options);
  }

  public connectRedis = async (): Promise<void> => {
    console.log("Connecting to Redis Cluster: " + this.config.redis.host + ":" + this.config.redis.port);
    console.log("                             " + this.config.redis.username + " " + this.config.redis.password);
    this.redis.on("error", (err) => console.error("Redis Cluster Error", err));
    await this.redis
      .connect()
      .then(() => {
        console.log("Connected to Redis Cluster: " + this.config.redis.host + ":" + this.config.redis.port);
      })
      .catch((err) => {
        console.error("Error connecting to Redis Cluster: " + this.config.redis.host + ":" + this.config.redis.port, err);
        exit(1);
      });
  };
}
