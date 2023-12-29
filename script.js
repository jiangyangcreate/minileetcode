// 获取元素的简便函数
const getElement = (id) => document.getElementById(id);

// 获取选项的选择状态
const easyCheckbox = getElement("easy");
const mediumCheckbox = getElement("medium");
const officeCheckbox = getElement("office");

// 获取页面元素
const contentContainer = getElement("content-container");
const hideSolutionBtn = getElement("hide-solution");
const showSolutionBtn = getElement("show-solution");
const changeProblemBtn = getElement("change-problem");
const prevProblemBtn = getElement("prev-problem"); // Add this line
const nextProblemBtn = getElement("next-problem"); // Add this line

let currentProblemIndex = 0; // Add this line

// 隐藏和展示按钮的事件监听器
hideSolutionBtn.addEventListener("click", toggleSolutionVisibility);
showSolutionBtn.addEventListener("click", toggleSolutionVisibility);

// 再来一题按钮的点击事件监听器
changeProblemBtn.addEventListener("click", loadChangeProblem);
prevProblemBtn.addEventListener("click", loadPrevProblem); // Add this line
nextProblemBtn.addEventListener("click", loadNextProblem); // Add this line

// 初始化页面
fetchDataAndHandle();

// 处理 JSON 数据
function handleJsonData(data) {
    const randomProblem = getRandomProblem(data);
    updatePageWithRandomData(randomProblem);
}

// 更新页面
function updatePageWithRandomData(randomProblem) {
    const htmlContent = `
        <div class="container">
            <div class="left-div">
                <div class="pre-container">
                    <h2>${randomProblem.title}</h2>
                    <p>难度：${randomProblem.level}</p>
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
    contentContainer.innerHTML = htmlContent;
}

// 隐藏/展示题解内容
function toggleSolutionVisibility() {
    const solutionContent = getElement("solution-content");
    solutionContent.classList.toggle("hidden");
}

// 获取随机问题
function getRandomProblem(data) {
    const filteredData = data.filter(problem => {
        if (easyCheckbox.checked && problem.level === "easy") {
            return true;
        } else if (mediumCheckbox.checked && problem.level === "medium") {
            return true;
        } else if (officeCheckbox.checked && problem.level === "office") {
            return true;
        }
        return false;
    });

    return filteredData.length > 0
        ? filteredData[Math.floor(Math.random() * filteredData.length)]
        : data[Math.floor(Math.random() * data.length)];
}

// 加载随机问题
function loadChangeProblem() {
    fetchDataAndHandle();
}

// 加载上一个问题
function loadPrevProblem() {
    currentProblemIndex = (currentProblemIndex - 1 + data.length) % data.length;
    updatePageWithRandomData(data[currentProblemIndex]);
}

// 加载下一个问题
function loadNextProblem() {
    currentProblemIndex = (currentProblemIndex + 1) % data.length;
    updatePageWithRandomData(data[currentProblemIndex]);
}

// 使用 Fetch API 动态加载 JSON 文件并处理数据
function fetchDataAndHandle() {
    const apiUrl = 'https://raw.githubusercontent.com/jiangyangcreate/minileetcode/main/data_file.json';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            handleJsonData(data);
        })
        .catch(error => console.error('Error:', error));
}
