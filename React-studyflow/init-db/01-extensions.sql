-- Enable useful PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Create a function for case-insensitive search
CREATE OR REPLACE FUNCTION search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.term, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.short_definition, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.full_definition, '')), 'C') ||
        setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'D');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;