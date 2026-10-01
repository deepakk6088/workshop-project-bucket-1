const cache = {};
const TTL = 60 * 1000;
function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedEntry = cache[key];
    if (!cachedEntry) {
        res.set('X-Cache', 'MISS');
        return next();
    }
    const currentTime = Date.now();
    const cacheAge =
        currentTime - cachedEntry.createdAt;
    if (cacheAge >= TTL) {
        delete cache[key];
        res.set('X-Cache', 'MISS');
        return next();
    }
    res.set('X-Cache', 'HIT');

    return res.json(cachedEntry.data);
}
function setCache(key, data) {
    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}
function clearCache() {
    for (const key in cache) {
        delete cache[key];
    }
}
module.exports = { cacheMiddleware, setCache, clearCache };