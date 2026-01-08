
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartProductionPlan = async (factoryName: string, historicalData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a daily production plan for ${factoryName}.
      Historical Demand (Past 7 Days): ${JSON.stringify(historicalData)}.
      Provide a recommended production batch list for tomorrow to optimize inventory and minimize out-of-stock.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productName: { type: Type.STRING },
                  suggestedQuantity: { type: Type.NUMBER },
                  reasoning: { type: Type.STRING }
                },
                required: ["productName", "suggestedQuantity", "reasoning"]
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Production Error:", error);
    return null;
  }
};
