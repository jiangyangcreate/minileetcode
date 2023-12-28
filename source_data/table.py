import sqlite3
import re

# 连接到数据库（如果不存在，则会创建）
conn = sqlite3.connect("minileetcode.db")

# 创建一个游标对象，用于执行SQL语句
cursor = conn.cursor()

# 创建problems表
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS problems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        python_code TEXT,
        level TEXT
    )
"""
)

# 提交更改
conn.commit()

# 关闭连接
conn.close()


def parse_input_text(input_text):
    pattern = re.compile(
        r"##\s*(.*?)\s*###\s*描述\s*(.*?)\s*###\s*题解（Python）\s*```python\s*(.*?)\s*```",
        re.DOTALL,
    )

    matches = re.finditer(pattern, input_text)

    parsed_data = []

    for match in matches:
        title, desc, python_code = match.groups()
        parsed_data.append(
            {
                "标题": title.strip(),
                "描述": desc.strip(),
                "python_code": python_code.strip(),
            }
        )

    return parsed_data


# 连接到数据库
conn = sqlite3.connect("minileetcode.db")
cursor = conn.cursor()

for files in ["minileetcode_easy.md", "minileetcode_medium.md"]:
    level = files.split("_")[1].split(".")[0]
    with open(files, "r", encoding="utf-8") as f:
        input_text = f.read()

    for i in parse_input_text(input_text):
        # 插入数据
        cursor.execute(
            """
            INSERT INTO problems (title, description, python_code,level)
            VALUES (?, ?, ?, ?)
        """,
            (i["标题"], i["描述"], i["python_code"], level),
        )

# 提交更改
conn.commit()

# 关闭连接
conn.close()
