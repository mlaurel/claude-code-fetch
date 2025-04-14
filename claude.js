import dotenv from 'dotenv';
dotenv.config();

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

async function askClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicApiKey,
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
  console.log("\n🧠 Claude says:\n", data.content?.[0]?.text ?? JSON.stringify(data, null, 2));
}

// Call the function with a sample prompt
askClaude("Refactor this JavaScript function:\n\nfunction add(a,b){return a+b;}");
