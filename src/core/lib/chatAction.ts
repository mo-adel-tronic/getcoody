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
      role: "get report for student's Dart/Flutter code as JSON, classify issues in Arabic., use short answers and avoid long explanations. try to make suggestion short",
      parts: [
        { text: "If code is correct, respond with: {feedback: 'لقد قمت بعمل رائع', level: 'أحسنت'}" },
        { text: "If there's an issue, respond like: {feedback: 'هناك مشكلة ما حاول مرة أخرى', line: <ERROR-LINE_NUMBER>, page: <PAGE-PATH>, issue: <وصف الخطأ>, suggestion: <اقتراح للحل>, level: <خطأ|تنبية|تحذير>}" },
        { text: "Category levels:\n- `خطأ`: Critical, stops code from running.\n- `تنبية`: Suggestion to improve code.\n- `تحذير`: Potential issue.\n- `أحسنت`: No problems." },
        { text: "Keep Suggestion short and avoid hitting token limit. Only include the most important issues." }
      ]
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
                suggestion: { type: SchemaType.STRING },
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
      return JSON.parse(fixed);
    } catch (repairError) {
      console.error("🚨 Still failed to parse:", repairError, "\nResponse:\n", fixed);
      throw new Error("Invalid JSON from Gemini after stream. Try sending smaller input.");
    }
  }
}
