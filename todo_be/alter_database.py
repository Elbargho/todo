from databases.interface import DatabaseInterface
from app import app

tasks = DatabaseInterface("tasks")
tracker = DatabaseInterface("tracker")
notes = DatabaseInterface("notes")

if __name__ == "__main__":
    with app.app_context():
        try:
            conn = tasks.getConn()
            tasks.query("ALTER TABLE tasks ADD COLUMN is_in_my_day INTEGER")
            tasks.query("UPDATE tasks SET is_in_my_day = null WHERE category_id = 1")
            tasks.query("UPDATE tasks SET is_in_my_day = true WHERE category_id != 1")
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
