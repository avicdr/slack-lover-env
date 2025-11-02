import { supabase } from '@/integrations/supabase/client';

export interface ParsedMention {
  type: 'text' | 'mention';
  content: string;
  username?: string;
  userId?: string;
}

export async function parseMentions(content: string): Promise<ParsedMention[]> {
  const mentionRegex = /@(\w+)/g;
  const parts: ParsedMention[] = [];
  let lastIndex = 0;
  let match;

  // Extract all mentions
  const mentions: { username: string; index: number }[] = [];
  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push({ username: match[1], index: match.index });
  }

  // Fetch all mentioned users in one query
  if (mentions.length > 0) {
    const usernames = mentions.map(m => m.username);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, username')
      .in('username', usernames);

    const usernameToId = new Map(profiles?.map(p => [p.username, p.id]) || []);

    // Build parts array
    for (const mention of mentions) {
      // Add text before mention
      if (mention.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, mention.index),
        });
      }

      // Add mention
      const userId = usernameToId.get(mention.username);
      parts.push({
        type: 'mention',
        content: `@${mention.username}`,
        username: mention.username,
        userId,
      });

      lastIndex = mention.index + mention.username.length + 1; // +1 for @
    }
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }];
}
