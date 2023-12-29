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
const prevProblemBtn = getElement("prev-problem");
const nextProblemBtn = getElement("next-problem");
const jumpToProblemInput = getElement("jump-to-problem");
const jumpBtn = getElement("jump-btn");
jumpBtn.addEventListener("click", () => jumpToProblem(data));

let currentProblemIndex = 0;
let data;
// 隐藏和展示按钮的事件监听器
hideSolutionBtn.addEventListener("click", toggleSolutionVisibility);
showSolutionBtn.addEventListener("click", toggleSolutionVisibility);

// 再来一题按钮的点击事件监听器
changeProblemBtn.addEventListener("click", loadChangeProblem);
prevProblemBtn.addEventListener("click", () => loadPrevProblem(data)); // Modified this line
nextProblemBtn.addEventListener("click", () => loadNextProblem(data)); // Modified this line

// 初始化页面
const apiUrl = 'https://raw.githubusercontent.com/jiangyangcreate/minileetcode/main/data_file.json';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(jsonData => {
        data = jsonData;  // Assign the fetched data to the 'data' variable
        handleJsonData(data);
    })
    .catch(error => console.error('Error:', error));

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

    // 更新当前题号和总题数
    const currentProblemNumberElement = getElement("current-problem-number");
    const totalProblemsNumberElement = getElement("total-problems-number");

    currentProblemNumberElement.textContent = currentProblemIndex + 1;
    const filteredData = filterProblemsByDifficulty(data, easyCheckbox.checked, mediumCheckbox.checked, officeCheckbox.checked);
    totalProblemsNumberElement.textContent = filteredData.length;
}

// 隐藏/展示题解内容
function toggleSolutionVisibility() {
    const solutionContent = getElement("solution-content");
    solutionContent.classList.toggle("hidden");
}

// 封装问题筛选函数
function filterProblemsByDifficulty(data, easyChecked, mediumChecked, officeChecked) {
    return data.filter(problem => {
        if (easyChecked && problem.level === "easy") {
            return true;
        } else if (mediumChecked && problem.level === "medium") {
            return true;
        } else if (officeChecked && problem.level === "office") {
            return true;
        }
        return false;
    });
}

// 获取随机问题
function getRandomProblem(data) {
    const filteredData = filterProblemsByDifficulty(data, easyCheckbox.checked, mediumCheckbox.checked, officeCheckbox.checked);

    return filteredData.length > 0
        ? filteredData[Math.floor(Math.random() * filteredData.length)]
        : data[Math.floor(Math.random() * data.length)];
}

// 加载随机问题
function loadChangeProblem() {
    fetchDataAndHandle();
}

// 加载上一个问题
function loadPrevProblem(data) {
    const new_data =  filterProblemsByDifficulty(data, easyCheckbox.checked, mediumCheckbox.checked, officeCheckbox.checked);
    currentProblemIndex = (currentProblemIndex - 1 + new_data.length) % new_data.length;
    updatePageWithRandomData(new_data[currentProblemIndex]);
}

// 加载下一个问题
function loadNextProblem(data) {
    const new_data =  filterProblemsByDifficulty(data, easyCheckbox.checked, mediumCheckbox.checked, officeCheckbox.checked);
    currentProblemIndex = (currentProblemIndex + 1) % new_data.length;
    updatePageWithRandomData(new_data[currentProblemIndex]);
}

// 跳转到指定问题
function jumpToProblem(data) {
    const new_data =  filterProblemsByDifficulty(data, easyCheckbox.checked, mediumCheckbox.checked, officeCheckbox.checked);
    const jumpToProblemNumber = parseInt(jumpToProblemInput.value, 10);
    
    if (isNaN(jumpToProblemNumber) || jumpToProblemNumber < 1 || jumpToProblemNumber > new_data.length) {
        alert("请输入有效的问题号！");
        return;
    }

    currentProblemIndex = jumpToProblemNumber - 1;
    updatePageWithRandomData(new_data[currentProblemIndex]);
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
