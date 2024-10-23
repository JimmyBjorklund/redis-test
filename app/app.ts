
import { RedisService } from "./redis-service";
import { Config } from "./config";

process.env.TZ = "UTC";

const config = new Config();

const redisService = new RedisService(config);


redisService.connectRedis().then(() => {
  console.log("Connected to Redis Cluster: " + config.redis.host + ":" + config.redis.port);
});

console.log("Let's kick it!");
