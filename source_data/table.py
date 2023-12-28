import re
import json


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


# 创建一个空数组，用于存储问题数据
problems_data = []

for files in ["minileetcode_easy.md", "minileetcode_medium.md"]:
    level = files.split("_")[1].split(".")[0]
    with open(files, "r", encoding="utf-8") as f:
        input_text = f.read()

    for i in parse_input_text(input_text):
        # 构建数据对象并追加到数组
        data = {
            "title": i["标题"],
            "description": i["描述"],
            "python_code": i["python_code"],
            "level": level,
        }
        problems_data.append(data)

# 将整个数组写入 JSON 文件
with open("../data_file.json", "w", encoding="utf-8") as write:
    json.dump(problems_data, write, ensure_ascii=False, indent=2)
