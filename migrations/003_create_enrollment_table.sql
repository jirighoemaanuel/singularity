-- 6. Enrollments (Who bought what?)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraint: A user can't buy the same course twice
    UNIQUE(user_id, course_id)
);

-- 7. Progress Tracking
-- We track specific lessons completed by specific enrollments
CREATE TABLE lesson_progress (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraint: You can't complete the same lesson twice in the same enrollment
    UNIQUE(enrollment_id, lesson_id)
);