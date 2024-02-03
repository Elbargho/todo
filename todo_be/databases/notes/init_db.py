import sqlite3

connection = sqlite3.connect('./databases/notes/database.db')

with open('./databases/notes/schema.sql') as f:
    connection.executescript(f.read())