import { LLM } from "@langchain/core/language_models/llms";
import { CallbackManagerForLLMRun } from "@langchain/core/callbacks/manager";

interface CustomHuggingFaceLLMParams {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  provider?: string;
  maxRetries?: number;
}

export class CustomHuggingFaceLLM extends LLM {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private provider: string;
  private maxRetries: number;
  private baseUrl: string;

  constructor(params: CustomHuggingFaceLLMParams) {
    super({});
    this.apiKey = params.apiKey;
    this.model = params.model || "deepseek/deepseek-v3-0324";
    this.maxTokens = params.maxTokens || 512;
    this.temperature = params.temperature || 0.1;
    this.provider = params.provider || "novita";
    this.maxRetries = params.maxRetries || 2;
    this.baseUrl = `https://router.huggingface.co/${this.provider}/v3/openai/chat/completions`;
  }

  async _call(
    prompt: string,
    options?: { stop?: string[]; signal?: AbortSignal },
    runManager?: CallbackManagerForLLMRun
  ): Promise<string> {
    const requestBody = {
      model: this.model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      stream: false,
    };

    let lastError;
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        const response = await fetch(this.baseUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: options?.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
          return data.choices[0].message.content;
        } else {
          throw new Error("No choices returned from API");
        }
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${i + 1} failed:`, error);

        if (i < this.maxRetries - 1) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }

    throw lastError;
  }

  _llmType(): string {
    return "custom-huggingface-inference-providers";
  }

  _identifyingParams() {
    return {
      model: this.model,
      provider: this.provider,
      maxTokens: this.maxTokens,
      temperature: this.temperature,
    };
  }
}

// Usage example:
/*
const llm = new CustomHuggingFaceLLM({
  apiKey: process.env.API_KEY!,
  model: "deepseek/deepseek-v3-0324",
  maxTokens: 512,
  temperature: 0.1,
  provider: "novita",
  maxRetries: 2,
});
*/