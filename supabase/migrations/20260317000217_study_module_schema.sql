-- Create Study Decks Table
CREATE TABLE public.study_decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Study Flashcards Table
CREATE TABLE public.study_flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID NOT NULL REFERENCES public.study_decks(id) ON DELETE CASCADE,
    front_content TEXT NOT NULL,
    back_content TEXT NOT NULL,
    interval INTEGER NOT NULL DEFAULT 0,
    repetition INTEGER NOT NULL DEFAULT 0,
    ease_factor NUMERIC NOT NULL DEFAULT 2.5,
    next_review_date TIMESTAMPTZ
);

-- Create Study Notes Table
CREATE TABLE public.study_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Note Links Table
CREATE TABLE public.note_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_note_id UUID NOT NULL REFERENCES public.study_notes(id) ON DELETE CASCADE,
    target_note_id UUID NOT NULL REFERENCES public.study_notes(id) ON DELETE CASCADE,
    UNIQUE (source_note_id, target_note_id)
);

-- Enable RLS
ALTER TABLE public.study_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for study_decks
CREATE POLICY "Users can manage own study decks"
    ON public.study_decks
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- RLS Policies for study_flashcards
CREATE POLICY "Users can manage own study flashcards"
    ON public.study_flashcards
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.study_decks
            WHERE study_decks.id = public.study_flashcards.deck_id
            AND study_decks.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.study_decks
            WHERE study_decks.id = public.study_flashcards.deck_id
            AND study_decks.user_id = auth.uid()
        )
    );

-- RLS Policies for study_notes
CREATE POLICY "Users can manage own study notes"
    ON public.study_notes
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- RLS Policies for note_links
CREATE POLICY "Users can manage own note links"
    ON public.note_links
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.study_notes
            WHERE study_notes.id = public.note_links.source_note_id
            AND study_notes.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.study_notes
            WHERE study_notes.id = public.note_links.source_note_id
            AND study_notes.user_id = auth.uid()
        )
    );

