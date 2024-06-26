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
    is_in_my_day INTEGER,
    disable_today INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE tasks_progress (
    task_id INTEGER REFERENCES tasks(id),
    done_at TIMESTAMP,
    now TIMESTAMP
);

CREATE TABLE sub_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER REFERENCES tasks(id),
    title TEXT,
    is_done INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE sub_tasks_progress (
    sub_task_id INTEGER REFERENCES sub_tasks(id),
    done_at TIMESTAMP,
    now TIMESTAMP
);

CREATE TABLE tasks_history (
    task_id INTEGER REFERENCES tasks(id),
    updated_task_id INTEGER REFERENCES tasks(id)
);

CREATE TABLE tasks_order (
    order_list TEXT
);

CREATE TABLE today (
    current_day TIMESTAMP
);