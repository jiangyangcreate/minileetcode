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
                <div class="pre-container">
                    <h2>${randomProblem.title}</h2>

                    <p>难度：${randomProblem.level}<p>

                    <h3>描述</h3>

                    <pre>${randomProblem.description}</pre>
                </div>
            </div>

            <div class="right-div">
                <h3>题解</h3>
                <div class="pre-container hidden" id="solution-content">
                    <pre id="codeBlock" class="collapsed">${randomProblem.python_code}</pre>
                </div>
            </div>
        </div>
    `;

    // 将 HTML 字符串设置为内容
    contentContainer.innerHTML = htmlContent;

    // 获取隐藏和展示按钮
    const hideSolutionBtn = document.getElementById("hide-solution");
    const showSolutionBtn = document.getElementById("show-solution");

    // 添加事件监听器
    hideSolutionBtn.addEventListener("click", function() {
        const solutionContent = document.getElementById("solution-content");
        solutionContent.classList.add("hidden");
    });

    showSolutionBtn.addEventListener("click", function() {
        const solutionContent = document.getElementById("solution-content");
        solutionContent.classList.remove("hidden");
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
