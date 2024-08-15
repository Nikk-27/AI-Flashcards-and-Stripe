import {NextResponse} from 'next/server'
import OpenAI from 'openai' 

const systemPrompt = `
Task: Create flashcards
Description: Generate flashcards for studying purposes based on provided content.
Input:
  Content: Text or data from which flashcards will be created.
  Format: Specify the format of the input content (e.g., plain text, markdown, etc.).
Output:
  Flashcards:
    - Question: The question or prompt for the flashcard.
    - Answer: The answer or explanation for the flashcard.
  Format: Specify the format of the output flashcards (e.g., JSON, plain text, etc.).
Examples:
  Input: Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.
  Output:
    - Question: What is photosynthesis?
      Answer: Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.
    - Question: What is the role of chlorophyll in photosynthesis?
      Answer: Chlorophyll helps in the absorption of sunlight, which is necessary for photosynthesis.
Instructions: Use the provided content to generate flashcards. Ensure that each flashcard has a clear and concise question and answer.

Return in the following JSON format
{
    "flashcards":[{
        "front": str,
        "back": str,
    }]
}
`;

export async function POST(req) {
    const openai = OpenAI();
    const data = await req.text();

    const completion = await openai.chat.completion.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
        model: 'gpt-4',
        response_format: 'json',
    });

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcard);
}

