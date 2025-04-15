import { AgentResponse } from "@/types";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function myStartChat(key: string, myCode: {
  task: string;
  studentCode: object;
}) : Promise<{issues: AgentResponse[]}> {
  const genAI = new GoogleGenerativeAI(key);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: {
      role: "get report for student's dart code in json formatting, flutter apps and classify issues into four categories in arabic language",
      parts: [
        {
          text: "Example of Response when code is correct: {feedback: 'لقد قمت بعمل رائع', level: 'أحسنت'}"
        },
        {
          text: "Example of Response when code has a problem: {feedback: 'هناك مشكلة ما حاول مرة أخرى', line: <ERROR-LINE_NUMBER>, page: <PAGE-PATH>, issue: <DESCRIPE-ERROR>, suggestion: <SUGGESSION-FOR-SOLVING-ERROR>, level: <خطأ|تنبية|تحذير>}"
        },
        {
          text: "category1: `خطأ` This is a critical issue that prevents the code from compiling or running. - Example of Error: Missing a semicolon (;) in Dart.",
        },
        {
          text: "category2: `تنبية` This is a suggestion to improve code quality, maintainability, or performance. - Example: Using final instead of var when the value does not change."
        },
        {
          text: "category3: `تحذير` This is a potential issue that does not prevent execution but may cause unexpected behavior. - Example: Declaring an unused variable"
        },
        {
          text: "category4: `أحسنت` this has got when there is no problem in the code"
        }
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
                feedback: {type: SchemaType.STRING}
              },
            },
          },
        },
      },
    },
  });

  const chat = model.startChat();
  const result = await chat.sendMessageStream(JSON.stringify(myCode));
  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    text += chunkText;
  }
  return JSON.parse(text)
}
