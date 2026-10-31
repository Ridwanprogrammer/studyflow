import sqlite3, json

con = sqlite3.connect(r"C:\Users\RIDWAN\Documents\Study\React-studyflow\backend\db.sqlite3")
cur = con.cursor()
print("DISCIPLINES:")
for row in cur.execute("select id,name,slug,color,icon from courses_discipline"):
    print(row)
print("COURSES:")
for row in cur.execute("select id,code,title,discipline_id from courses_course"):
    print(row)
