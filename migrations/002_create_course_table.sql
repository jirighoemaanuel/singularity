-- 3. The Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    instructor_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- Constraint: No negative prices
    category VARCHAR(50),
    level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for filtering/search (Replaces Redis Caching)
CREATE INDEX idx_courses_search ON courses(category, level);

-- 4. The Modules Table (e.g., "Week 1", "Section 2")
CREATE TABLE course_modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0 -- Vital for ordering: Module 1, Module 2...
);

-- 5. The Lessons Table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    content_url TEXT, -- Link to Video
    lesson_type VARCHAR(20) DEFAULT 'video',
    duration_seconds INTEGER, 
    sort_order INTEGER NOT NULL DEFAULT 0
);