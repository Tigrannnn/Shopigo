const Redis = require('ioredis');

// On macOS the default Redis instance is usually available without a password on 127.0.0.1:6379
const isProduction = process.env.NODE_ENV === 'production';
const redisUrl = isProduction ? process.env.REDIS_URL : process.env.REDIS_TEST_URL
const redis = new Redis(
    redisUrl || 'redis://127.0.0.1:6379'
);

redis.on('connect', () => console.log('✅ Redis connected successfully'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

module.exports = redis;