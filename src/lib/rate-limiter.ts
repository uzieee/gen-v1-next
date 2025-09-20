// Simple in-memory rate limiter for OpenAI API calls
class RateLimiter {
  private calls: number[] = [];
  private readonly maxCalls: number;
  private readonly windowMs: number;

  constructor(maxCalls: number = 10, windowMs: number = 60000) { // 10 calls per minute
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
  }

  canMakeCall(): boolean {
    const now = Date.now();
    
    // Remove calls outside the window
    this.calls = this.calls.filter(callTime => now - callTime < this.windowMs);
    
    // Check if we can make another call
    if (this.calls.length >= this.maxCalls) {
      return false;
    }
    
    // Record this call
    this.calls.push(now);
    return true;
  }

  getTimeUntilNextCall(): number {
    if (this.calls.length === 0) return 0;
    
    const oldestCall = Math.min(...this.calls);
    const timeUntilOldestExpires = this.windowMs - (Date.now() - oldestCall);
    
    return Math.max(0, timeUntilOldestExpires);
  }
}

// Create rate limiter instances
export const iceBreakerRateLimiter = new RateLimiter(5, 60000); // 5 calls per minute
export const bioRateLimiter = new RateLimiter(3, 60000); // 3 calls per minute

export function shouldSkipOpenAICall(rateLimiter: RateLimiter): boolean {
  if (!rateLimiter.canMakeCall()) {
    const waitTime = rateLimiter.getTimeUntilNextCall();
    console.log(`Rate limit hit. Wait ${Math.ceil(waitTime / 1000)} seconds before next call.`);
    return true;
  }
  return false;
}
