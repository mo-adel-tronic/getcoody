import { AgentResponse } from "@/types";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function myStartChat(
  key: string,
  myCode: { task: string; studentCode: object }
): Promise<{ issues: AgentResponse[] }> {
  const genAI = new GoogleGenerativeAI(key);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: {
      text: "Analyze Dart/Flutter code and return JSON feedback in Arabic. Respond only with valid JSON. Avoid long or corrupted file paths. Keep file names like '/lib/main.dart' simple. Keep response under token limits. Examples: ✅ Correct: {feedback: 'أحسنت', level: 'أحسنت'} ❌ With issues: {feedback: 'هناك مشكلة', line: 12, page: '/lib/home.dart', issue: '...', suggestion: '...', level: 'خطأ'}"
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          issues: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                line: { type: SchemaType.INTEGER },
                page: { type: SchemaType.STRING },
                issue: { type: SchemaType.STRING },
                level: { type: SchemaType.STRING },
                feedback: { type: SchemaType.STRING }
              }
            }
          }
        }
      }
    }
  });

  const chat = model.startChat();
  const result = await chat.sendMessageStream(JSON.stringify(myCode));

  let responseText = "";
  for await (const chunk of result.stream) {
    responseText += chunk.text();
  }

  try {
    // Try parsing as-is
    return JSON.parse(responseText);
  } catch (error) {
    console.warn("❗JSON parse failed. Attempting to repair...");
    
    // Try to repair (basic fix for missing closing brackets)
    let fixed = responseText.trim();

    // Heuristic: close open object or array
    if (!fixed.endsWith("}")) fixed += "}";
    if (!fixed.includes("issues")) {
      throw new Error("Response from Gemini was incomplete and not recoverable.");
    }

    try {
  return JSON.parse(responseText);
} catch (error) {
  console.warn("❗JSON parse failed. Attempting manual repair...");

  // Heuristic: Trim and sanitize
  let fixed = responseText.trim();

  // If there's an unclosed string (e.g., `"page": "/lib/...` without closing quote)
  const lastQuoteIndex = fixed.lastIndexOf('"');
  const lastColonIndex = fixed.lastIndexOf(':');
  
  // If the last string wasn't closed properly, close it
  if (lastColonIndex > 0 && lastQuoteIndex < lastColonIndex) {
    // Try to clip to the last valid quote
    fixed = fixed.substring(0, lastColonIndex) + '"/lib/main.dart" }]}';
  }

  // Close braces/brackets
  if (!fixed.endsWith("}")) fixed += "}";
  if (!fixed.endsWith("}]}")) fixed = fixed.replace(/}+$/, "") + "}]}";

  try {
    return JSON.parse(fixed);
  } catch (repairError) {
    console.error("🚨 Still failed to parse:", repairError, "\nResponse:\n", fixed);
    throw new Error("Invalid JSON from Gemini after stream. Try reducing input size or simplify prompt.");
  }
}

  }
}
