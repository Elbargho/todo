CREATE TABLE notes_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    is_active INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_list_id INTEGER REFERENCES notes_list(id),
    text TEXT,
    is_active INTEGER,
    created_at TIMESTAMP
);