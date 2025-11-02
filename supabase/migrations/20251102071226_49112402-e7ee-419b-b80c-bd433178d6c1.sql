-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create channels table
CREATE TABLE IF NOT EXISTS public.channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'channel',
  section TEXT,
  created_by UUID REFERENCES auth.users(id),
  dm_users UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on channels
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- RLS policies for channels
CREATE POLICY "Channels are viewable by everyone" 
ON public.channels FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create channels" 
ON public.channels FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update channels they created" 
ON public.channels FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete channels they created" 
ON public.channels FOR DELETE 
USING (auth.uid() = created_by);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES public.channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for messages
CREATE POLICY "Messages are viewable by everyone" 
ON public.messages FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create messages" 
ON public.messages FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
ON public.messages FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages" 
ON public.messages FOR DELETE 
USING (auth.uid() = user_id);

-- Create reactions table
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Enable RLS on reactions
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for reactions
CREATE POLICY "Reactions are viewable by everyone" 
ON public.reactions FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create reactions" 
ON public.reactions FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions" 
ON public.reactions FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for message attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('message-attachments', 'message-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for message attachments bucket
DROP POLICY IF EXISTS "Anyone can view message attachments" ON storage.objects;
CREATE POLICY "Anyone can view message attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'message-attachments');

DROP POLICY IF EXISTS "Authenticated users can upload message attachments" ON storage.objects;
CREATE POLICY "Authenticated users can upload message attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'message-attachments' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Users can delete their own message attachments" ON storage.objects;
CREATE POLICY "Users can delete their own message attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'message-attachments' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Enable realtime for messages and reactions
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.channels;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();