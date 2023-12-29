const getElement = (id) => document.getElementById(id);
const ELEMENTS = {
    easy: getElement("easy"),
    medium: getElement("medium"),
    office: getElement("office"),
    contentContainer: getElement("content-container"),
    hideSolutionBtn: getElement("hide-solution"),
    showSolutionBtn: getElement("show-solution"),
    changeProblemBtn: getElement("change-problem"),
    prevProblemBtn: getElement("prev-problem"),
    nextProblemBtn: getElement("next-problem"),
    jumpToProblemInput: getElement("jump-to-problem"),
    jumpBtn: getElement("jump-btn"),
    currentProblemNumber: getElement("current-problem-number"),
    totalProblemsNumber: getElement("total-problems-number"),
    solutionContent: getElement("solution-content"),
};

const API_URL = 'https://raw.githubusercontent.com/jiangyangcreate/minileetcode/main/data_file.json';

let currentProblemIndex = 0;
let data;

ELEMENTS.jumpBtn.addEventListener("click", () => jumpToProblem(data));
ELEMENTS.hideSolutionBtn.addEventListener("click", toggleSolutionVisibility);
ELEMENTS.showSolutionBtn.addEventListener("click", toggleSolutionVisibility);
ELEMENTS.changeProblemBtn.addEventListener("click", loadChangeProblem);
ELEMENTS.prevProblemBtn.addEventListener("click", () => loadPrevProblem(data));
ELEMENTS.nextProblemBtn.addEventListener("click", () => loadNextProblem(data));

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
}

async function init() {
    try {
        data = await fetchData(API_URL);
        handleJsonData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleJsonData(data) {
    const randomProblem = getRandomProblem(data);
    updatePageWithRandomData(randomProblem);
}

function updatePageWithRandomData(randomProblem) {
    const { title, level, description, python_code } = randomProblem;
    const { contentContainer, currentProblemNumber, totalProblemsNumber, solutionContent } = ELEMENTS;
    const filteredData = filterProblemsByDifficulty(set_alert = false);

    const htmlContent = `
        <div class="container">
            <div class="left-div">
                <div class="pre-container">
                    <h2>${title}</h2>
                    <p>难度：${level}</p>
                    <h3>描述</h3>
                    <pre>${description}</pre>
                </div>
            </div>
            <div class="right-div">
                <h3>题解</h3>
                <div class="pre-container hidden" id="solution-content">
                    <pre id="codeBlock" class="collapsed">${python_code}</pre>
                </div>
            </div>
        </div>
    `;
    contentContainer.innerHTML = htmlContent;

    // 更新当前题号和总题数 
    currentProblemNumber.textContent = filteredData.indexOf(randomProblem)+1;
    totalProblemsNumber.textContent = filteredData.length;
}

function toggleSolutionVisibility() {
    ELEMENTS.solutionContent.classList.toggle("hidden");
}

function filterProblemsByDifficulty(set_alert = true) {
    const { easy, medium, office } = ELEMENTS;
    
    // 检查至少一个题型被选择
    if (!easy.checked && !medium.checked && !office.checked) {
        if (set_alert === true) {
            alert("请至少选择一个题型！");
        }
        return data;
    }

    return data.filter(problem => {
        if (easy.checked && problem.level === "easy") {
            return true;
        } else if (medium.checked && problem.level === "medium") {
            return true;
        } else if (office.checked && problem.level === "office") {
            return true;
        }
        return false;
    });
}

function getRandomProblem(data) {
    const filteredData = filterProblemsByDifficulty();

    return filteredData.length > 0
        ? filteredData[Math.floor(Math.random() * filteredData.length)]
        : data[Math.floor(Math.random() * data.length)];
}

function loadChangeProblem() {
    const new_data = filterProblemsByDifficulty();
    handleJsonData(new_data);
}

function loadPrevProblem() {
    const new_data = filterProblemsByDifficulty();
    currentProblemIndex = (currentProblemIndex - 1 + new_data.length) % new_data.length;
    updatePageWithRandomData(new_data[currentProblemIndex]);
}

function loadNextProblem() {
    const new_data = filterProblemsByDifficulty();
    currentProblemIndex = (currentProblemIndex + 1) % new_data.length;
    updatePageWithRandomData(new_data[currentProblemIndex]);
}

function jumpToProblem() {
    const new_data = filterProblemsByDifficulty();
    const jumpToProblemNumber = parseInt(ELEMENTS.jumpToProblemInput.value, 10);
    
    if (isNaN(jumpToProblemNumber) || jumpToProblemNumber < 1 || jumpToProblemNumber > new_data.length) {
        alert("请输入有效的问题号！");
        return;
    }

    currentProblemIndex = jumpToProblemNumber - 1;
    updatePageWithRandomData(new_data[currentProblemIndex]);
}

init();
