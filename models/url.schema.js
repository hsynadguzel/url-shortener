class UrlSchema {
    constructor(shortId, longUrl, shortUrl, clicks, createdAt) {
        this.shortId = shortId;
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
        this.clicks = clicks;
        this.createdAt = new Date(createdAt);
    }

    // Factory method to create a UrlSchema object from a plain object (Map)
    static fromMap(map) {
        return new UrlSchema(
            map.shortId,
            map.longUrl,
            map.shortUrl,
            map.clicks,
            map.createdAt
        );
    }

    // Method to convert UrlSchema object to a plain object (Map)
    toMap() {
        return {
            shortId: this.shortId,
            longUrl: this.longUrl,
            shortUrl: this.shortUrl,
            clicks: this.clicks,
            createdAt: this.createdAt.toISOString()
        };
    }

    // Method to convert UrlSchema object to JSON string
    toJson() {
        return JSON.stringify(this.toMap());
    }

    // Factory method to create a UrlSchema object from a JSON string
    static fromJson(json) {
        const map = JSON.parse(json);
        return UrlSchema.fromMap(map);
    }
}

export default UrlSchema;
