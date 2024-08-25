const Redis = require('ioredis');
const {default:Redlock} = require('redlock');

const redisClient = Redis.createClient({
    host: 'localhost',
    port: 6379,
});

const redlock = new Redlock(
    [redisClient],
    {
        driftFactor: 0.01,
        retryCount: 10,
        retryDelay: 200,
        retryJitter: 200,
    }
);

module.exports = redlock;
