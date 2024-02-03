CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    color TEXT,
    is_active INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE categories_statuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER REFERENCES categories(id),
    times_done INTEGER,
    done_at TIMESTAMP
);