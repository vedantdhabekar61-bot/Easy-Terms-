import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, RiskLevel } from "../types";

// Define the schema for the Gemini response
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: ["Low Risk", "Medium Risk", "High Risk"],
      description: "The overall risk assessment of the contract.",
    },
    score: {
      type: Type.NUMBER,
      description: "A safety score from 0 to 100, where 100 is perfectly safe and 0 is extremely dangerous.",
    },
    summary: {
      type: Type.STRING,
      description: "A 2-sentence summary of the contract.",
    },
    redFlags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A short, punchy headline for the risk (e.g., 'They own your work forever').",
          },
          explanation: {
            type: Type.STRING,
            description: "A plain English explanation (Grade 8 reading level) of why this is bad.",
          },
          originalText: {
            type: Type.STRING,
            description: "The exact snippet of legal text from the input that contains this risk.",
          },
          severity: {
            type: Type.STRING,
            enum: ["CRITICAL", "WARNING", "INFO"],
            description: "The severity of this specific flag.",
          },
        },
        required: ["title", "explanation", "originalText", "severity"],
      },
    },
  },
  required: ["riskLevel", "score", "summary", "redFlags"],
};

export const analyzeContract = async (text: string): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // System instruction based on PRD
    const systemInstruction = `You are an expert legal consultant and risk analyst. Your job is to protect the user.
    Analyze the following legal text provided by the user.
    Identify the top 5 most dangerous or restrictive clauses (Red Flags).
    Summarize each point in simple, casual English (Grade 8 reading level).
    If the text is safe, list the key obligations instead.
    Do not use legal jargon.
    Analyze specifically for risks related to IP ownership, non-competes, hidden fees, automatic renewals, and data privacy.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2, // Low temperature for factual analysis
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(resultText) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Analysis failed:", error);
    // Return a fallback error result instead of crashing
    return {
      riskLevel: RiskLevel.HIGH,
      score: 0,
      summary: "We encountered an error analyzing this document. Please try again.",
      redFlags: [
        {
          title: "Analysis Failed",
          explanation: "The AI service could not process your request at this time.",
          originalText: "N/A",
          severity: "INFO"
        }
      ]
    };
  }
};
