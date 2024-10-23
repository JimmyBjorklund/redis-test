
import { RedisService } from "./redis-service";

process.env.TZ = "UTC";

const config = {
  redis: {
    host: "clustercfg.connect-memdb.bbw2ni.memorydb.eu-north-1.amazonaws.com",
    port: 6379,
    username: "connect",
    password: "YjLbWJrL68thm3zmb6TCerRCJjwucZE"
  },
}
const redisService = new RedisService(config);


redisService.connectRedis().then(() => {
  console.log("Connected to Redis Cluster: " + config.redis.host + ":" + config.redis.port);
});

console.log("Let's kick it!");
