CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    is_active INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER REFERENCES categories(id),
    title TEXT,
    raw_title TEXT,
    is_done REAL,
    repeat TEXT,
    times_done INTEGER,
    is_active INTEGER,
    disable_today INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE sub_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER REFERENCES tasks(id),
    title TEXT,
    is_done INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE tasks_history (
    task_id INTEGER REFERENCES tasks(id),
    updated_task_id INTEGER REFERENCES tasks(id)
);

CREATE TABLE tasks_order (
    order_list TEXT
);

CREATE TABLE today (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    current_day TIMESTAMP
);