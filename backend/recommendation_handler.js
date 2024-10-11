const OpenAI = require('openai');

// Create a counter to keep track of API calls
let apiCallCount = 0;
const RATE_LIMIT = 5; // Max number of calls allowed
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute (in milliseconds)
let lastCallTime = Date.now();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchRecommendations = async (preferences,learningStyle) => {
  const openai = new OpenAI({
    apiKey: atob(process.env.OPENAI_KEY)
  });

  // Rate-limiting logic
  const now = Date.now();
  const timeElapsed = now - lastCallTime;

  // If we have reached the rate limit, pause for the remainder of the rate limit window
  if (apiCallCount >= RATE_LIMIT) {
    const waitTime = RATE_LIMIT_WINDOW - timeElapsed;
    if (waitTime > 0) {
      console.log(`Rate limit exceeded, waiting for ${waitTime} ms...`);
      await sleep(waitTime); // Pause execution for the wait time
    }
    apiCallCount = 0; // Reset the counter after waiting
    lastCallTime = Date.now(); // Reset the call time
  }

  try {
    const response = await openai.completions.create({
      model: "gpt-4o-mini", // Use the desired OpenAI model
      messages : [{
        role: "system",
        content:"You are a helpful assistant and teacher that will help his students by suggesting learning recommendation as per there topics and learning style",
      },
      { 
        role: "user",
        content:`Respond with a JSON object that contains only three fields: "title" as string, "description" as string, and "contentURL" as string. Produce 5+ learning recommendations on this topics : ${preferences} and learning style : ${learningStyle}`
      }],
      temperature: 0.7
    });

    apiCallCount++; // Increment the counter on successful call
    return response;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};


module.exports = fetchRecommendations;