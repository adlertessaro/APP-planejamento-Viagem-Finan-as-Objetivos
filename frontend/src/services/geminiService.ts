
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMilestones = async (objectiveName: string, description: string, targetAmount: number, currency: string) => {
  try {
    const prompt = `Decomponha o objetivo financeiro "${objectiveName}" (${description}) com orçamento de ${targetAmount} ${currency} em 5 a 8 marcos (milestones) acionáveis, realistas e motivadores.`;

    // Using ai.models.generateContent directly with model name and content
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título curto do marco" },
              description: { type: Type.STRING, description: "Explicação breve do que deve ser feito" },
              order_index: { type: Type.INTEGER, description: "Ordem sequencial" }
            },
            required: ["title", "description", "order_index"]
          }
        }
      }
    });

    // Accessing text property directly
    if (!response.text) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro ao gerar marcos com IA:", error);
    return [];
  }
};
