const axios = require('axios');

const parseRecommendationsFromResponse = (response) => {
  let jsonString = '';
  try {
      // Check if the response has the expected structure
      if (!response.data || !response.data.choices || response.data.choices.length === 0) {
          throw new Error('Invalid response structure: No choices available.');
      }

      // Get the content from the first choice
      const content = response.data.choices[0]?.message?.content;
      if (!content) {
          throw new Error('Invalid response structure: No content available.');
      }

      // Trim whitespace from the content
      let trimmedContent = content.trim();

      // Remove control characters (like newlines, tabs, etc.) using a regex
      trimmedContent = trimmedContent.replace(/[\x00-\x1F\x7F]/g, '');

      // Use a regex to extract the entire JSON array
      const jsonMatch = trimmedContent.match(/(\[.*\])/s); // Match the entire array
      if (!jsonMatch || jsonMatch.length < 1) {
          throw new Error('Invalid content structure: No valid JSON array found.');
      }

      // Extract the JSON string
      jsonString = jsonMatch[0];

      // Ensure the JSON string does not have trailing characters
      // Remove any trailing commas or unexpected characters
      jsonString = jsonString.replace(/,\s*}/g, '}'); // Remove trailing commas before closing brace
      jsonString = jsonString.replace(/,\s*]/g, ']'); // Remove trailing commas before closing bracket
      jsonString = jsonString.replace(/}\s*$/, '}'); // Ensure there's no space after closing brace
      jsonString = jsonString.replace(/]\s*$/, ']'); // Ensure there's no space after closing bracket

      // Log the final JSON string before parsing
      console.log('Final JSON string for parsing:', jsonString);

      // Parse the JSON
      const jsonArray = JSON.parse(jsonString);

      // Check if the extracted value has the expected structure
      if (!Array.isArray(jsonArray)) {
          throw new Error('Parsed value does not contain valid JSON array.');
      }

      return jsonArray;

  } catch (error) {
      console.error('Error parsing recommendations:', error.message);
      console.error(jsonString);
      return []; // You can return an empty array or handle the error as needed
  }
};


const fetchRecommendations = async (preferences, learningStyle, size) => {
  const HF_API_KEY = atob(process.env.HF_API_KEY);
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3.2-1B-Instruct',
        messages: [
          { role: 'system', content: `You are an English tutor recommending learning content. Must respond with an array of JSON objects, each containing title a string for the title of the content. description a string for a brief description under 100 words, contentURL must be alphanumeric and they should not be malformed URLs and other unusual characters. Make sure to only include array of maximum ${size} JSON objects.` },
          { role: 'user', content: `Must produce only ${size} qunatified, no whitespace and learning recommendations on the topics : ${preferences} and learning style: ${learningStyle}.` }],
        max_tokens: 1000,
        stream: false,
        format: "json",
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`, // Make sure to set your API key in .env file
          'Content-Type': 'application/json',
        },
      }
    );
    return parseRecommendationsFromResponse(response);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return []; // You can return null or an empty array based on your preference
  }
};

module.exports = fetchRecommendations;