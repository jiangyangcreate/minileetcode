function handleJsonData(data) {
    // 随机选择一个问题
    const randomProblem = data[Math.floor(Math.random() * data.length)];


    // 在这里可以进一步处理返回的数据，例如更新页面上的内容
    updatePageWithRandomData(randomProblem);
}
// 更新页面上的内容，显示标题、描述和 Python 代码

function updatePageWithRandomData(randomProblem) {
    const contentContainer = document.getElementById("content-container");

    // 创建一个包含标题、描述和 Python 代码的 HTML 字符串
    const htmlContent = `
        <div class="container">
            <div class="left-div">
                <h2>${randomProblem.title}</h2>

                <p>难度：${randomProblem.level}<p>

                <h3>描述</h3>

                <p class="description"><pre>${randomProblem.description}</pre></p>
            </div>

            <div class="right-div">
                <h3>题解</h3>
                <pre id="codeBlock" class="collapsed"><code>${randomProblem.python_code}</code></pre>
            </div>
        </div>
    `;

    // 将 HTML 字符串设置为内容
    contentContainer.innerHTML = htmlContent;

    // 添加点击事件，切换代码块的显示和隐藏状态
    const toggleCodeButton = document.getElementById("toggleCodeButton");
    const codeBlock = document.getElementById("codeBlock");

    toggleCodeButton.addEventListener("click", () => {
        codeBlock.classList.toggle("collapsed");
    });
}

// 使用 Fetch API 动态加载 JSON 文件
fetch('https://raw.githubusercontent.com/jiangyangcreate/minileetcode/main/data_file.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // 调用处理函数，传递加载的 JSON 数据
        handleJsonData(data);
    })
    .catch(error => console.error('Error:', error));
