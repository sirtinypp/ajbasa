import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Fetch data from Supabase for context
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const [
    { data: projects },
    { data: configData },
    { data: experience },
    { data: achievements }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('site_configs').select('*'),
    supabase.from('experience').select('*').order('order_index', { ascending: true }),
    supabase.from('achievements').select('*').order('year', { ascending: false })
  ]);

  const configs = configData?.reduce((acc: any, curr: any) => ({
    ...acc,
    [curr.key]: curr.data
  }), {} as any) || {};

  const aiConfig = configs.ai_config || {
    name: 'Portfolio Assistant',
    personality: 'Professional, helpful, and concise digital representative of Aaron.',
    instructions: `
      ## SMART PRESENTATION FRAMEWORK:
      1. **Direct Answer**: Start with a single, clear sentence answering the user's intent.
      2. **Structured Detail**: If providing lists or projects, use **Markdown tables** or **bullet points** with bold headers. Avoid long paragraphs.
      3. **Conversational Hook**: Always end your response with a short, relevant follow-up question to keep the conversation going.

      ## TONE & STYLE:
      - Use a "concise yet warm" professional tone.
      - Refer to Aaron in the third person unless specifically asked to act as him.
      - Use **bolding** for keywords and project titles.
      - Never dump all information at once; offer to provide more details if the user is interested.
    `
  };

  // 2. Construct the System Prompt
  const systemPrompt = `
    You are ${aiConfig.name}, Aaron Christian Basa's ${aiConfig.personality}.
    
    CRITICAL INSTRUCTIONS:
    ${aiConfig.instructions}

    AARON'S PROFILE:
    - Name: ${configs.identity?.name}
    - Title: ${configs.identity?.title}
    - Bio: ${configs.hero?.shortBio}
    - Full Bio: ${configs.about?.paragraphs?.join(' ')}


    EXPERIENCE:
    ${experience?.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

    PROJECTS:
    ${projects?.map(p => `- ${p.title} (${p.role}): ${p.description}. Tech: ${p.tags?.join(', ')}`).join('\n')}

    ACHIEVEMENTS:
    ${achievements?.map((a: any) => `- ${a.year}: ${a.title} - ${a.description}`).join('\n')}

    CONTACT:
    - GitHub: ${configs.identity?.github}
    - Email: ${configs.identity?.email}
  `;

  // 3. Convert UI messages to model messages
  const modelMessages = await convertToModelMessages(messages);

  // 4. Call Gemini
  const result = await streamText({
    model: google('gemini-2.5-flash'),
    messages: modelMessages,
    system: systemPrompt,
  });

  return result.toUIMessageStreamResponse();
}
