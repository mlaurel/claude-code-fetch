import dotenv from "dotenv";
dotenv.config();

// Define types for Claude API response
interface MessageContent {
    type: string;
    text: string;
}

interface ClaudeResponse {
    id: string;
    type: string;
    role: string;
    content: MessageContent[];
    model: string;
    stop_reason: string;
    stop_sequence: string | null;
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
}

// claude.ts
const anthropicApiKey = process.env.ANTHROPIC_API_KEY; // Load from env or hardcode for test

async function askClaude(prompt: string): Promise<ClaudeResponse> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicApiKey!,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1024,
            temperature: 0.7,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    const data = await response.json();
    return data as ClaudeResponse;
}

// Example usage:
askClaude("Refactor this JS function to improve readability:\n\nfunction add(a,b){return a+b;}")
    .then(res => {
        if (res.content && res.content[0]) {
            console.log(res.content[0].text);
        }
    })
    .catch(console.error);
