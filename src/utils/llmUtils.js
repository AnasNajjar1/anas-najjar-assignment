import { textGeneration } from "@huggingface/inference";

/**
 * Extract a JSON object from the response text using a regular expression.
 * @param {string} responseText - The text from which to extract the JSON object.
 * @param {Function} handleError - Function to handle errors.
 * @returns {Object|null} - The extracted JSON object or null if extraction fails.
 */
export const extractJsonObject = (responseText, handleError) => {
  const jsonMatch = responseText.match(/({[^{}]*})/);
  if (jsonMatch && jsonMatch.length > 0) {
    for (let i = 0; i < jsonMatch.length; i++) {
      try {
        const jsonString = jsonMatch[i];
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        continue;
      }
    }
  }
  console.error("No valid JSON object found in response text.");
  handleError("Unable to find relevant data in the response. Please try again.");
  return null;
};

/**
 * Generate a response from the LLM (Language Model) by providing the extracted text,
 * asking it to extract specific data and return it in JSON format.
 * @param {string} text - The text to be processed by the LLM.
 * @param {Function} handleError - Function to handle errors.
 * @returns {Promise<Object|null>} - The extracted JSON data or null if extraction fails.
 */
export const generateLlmResponse = async (text, handleError) => {
  try {
    const response = await textGeneration({
      accessToken: "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",
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `Extract specific data from the following text and return only the JSON object: ${text}.
         I need solely the First Name, Last Name, Sex, Nationality, Date of birth, Date of issue, Document type, Document number, and Date of expiry. 
         English only and JSON format, with each field name in camelCase like documentNumber. Do not include anything else.`,
      parameters: { max_new_tokens: 250 },
    });
    console.log("response ", response.generated_text);
    return extractJsonObject(response.generated_text, handleError);
  } catch (error) {
    handleError(
      "An error occurred while processing the data. Please try again."
    );
  }
};
