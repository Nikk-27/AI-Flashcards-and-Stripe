import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

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

Return in the following JSON format:
{
    "flashcards": [{
        "front": str,
        "back": str,
    }]
}

Only generate 10 Flashcards
`;

export async function POST(req) {
    const data = await req.text();

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `${systemPrompt}\n\n${data}`
                }]
            }]
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Failed to generate flashcards');
    }

    const result = await response.json();
   

  
    const content = result.candidates[0]?.content?.parts[0]?.text || '';
    const cleanedText = content.replace(/```json\n|\n```/g, '');

    let flashcards;
    try {
        flashcards = JSON.parse(cleanedText);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        flashcards = { flashcards: [] };
    }

    return NextResponse.json(flashcards);
}
