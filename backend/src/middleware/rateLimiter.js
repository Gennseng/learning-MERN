import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        // rate limiting done per user
        // "my-limit-key" to be replaced with actual user id if there's authentication
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) {
            return res.status(429).json({
                message:"You are rate limited!"
            })
        }

        next()

    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
}

export default rateLimiter