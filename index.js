const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('minileetcode.db');

db.serialize(() => {
  // 创建problems表
  db.run(`
    CREATE TABLE IF NOT EXISTS problems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      python_code TEXT,
      js_code TEXT
    )
  `);

  // 在表中插入一条示例数据
  const insertStatement = db.prepare(`
    INSERT INTO problems (title, description, python_code, js_code)
    VALUES (?, ?, ?, ?)
  `);

  insertStatement.run('Example Problem', 'Description of the problem', 'Python code here', 'JS code here');

  // 关闭数据库连接
  insertStatement.finalize();
});

db.close();
