import sqlite3

con = sqlite3.connect(r"C:\Users\RIDWAN\Documents\Study\React-studyflow\backend\db.sqlite3")
cur = con.cursor()
tables = [r[0] for r in cur.execute("select name from sqlite_master where type='table' order by name")]
print("TABLES:", tables)
for t in ["courses_discipline", "courses_course", "courses_topic", "courses_glossaryterm", "courses_userprogress", "users"]:
    if t in tables:
        try:
            print(t, cur.execute(f"select count(*) from {t}").fetchone()[0])
        except Exception as e:
            print(t, "ERR", e)
    else:
        print(t, "MISSING")
