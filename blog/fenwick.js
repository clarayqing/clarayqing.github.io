const demo = document.getElementById("bit-demo");
const setup = document.getElementById("bit-build");
const updates = document.getElementById("bit-update");
const queries = document.getElementById("bit-query");
const clear = document.getElementById("bit-clear");
const sizeInput = document.getElementById("bit-size");
const valueInput = document.getElementById("bit-values");
const updateInput = document.getElementById("bit-update-index");
const deltaInput = document.getElementById("bit-delta");
const queryInput = document.getElementById("bit-query-index");
const arrayView = document.getElementById("bit-array");
const treeView = document.getElementById("bit-tree");
const statusOutput = document.getElementById("bit-status");

let values = [];
let tree = [];

function lowbit(number) {
    return number & -number;
}

function add(nodes, index, delta) {
    const visited = [];
    for (let position = index; position < nodes.length; position += lowbit(position)) {
        nodes[position] += delta;
        visited.push(position);
    }
    return visited;
}

function describeCell(label, value, range) {
    const cell = document.createElement("li");
    const name = document.createElement("span");
    const amount = document.createElement("strong");
    cell.className = "bit-cell";
    name.textContent = label;
    amount.textContent = String(value);
    cell.append(name, amount);
    if (range) {
        const detail = document.createElement("span");
        detail.textContent = range;
        cell.append(detail);
    }
    return cell;
}

function highlight(path) {
    for (const [index, cell] of Array.from(treeView.children).entries()) {
        cell.classList.toggle("active", path.includes(index + 1));
    }
}

function render() {
    const arrays = [];
    const nodes = [];
    for (let index = 1; index < values.length; index++) {
        arrays.push(describeCell("a[" + index + "]", values[index]));
        const left = index - lowbit(index) + 1;
        nodes.push(describeCell("bit[" + index + "]", tree[index], "[" + left + "–" + index + "]"));
    }
    arrayView.replaceChildren(...arrays);
    treeView.replaceChildren(...nodes);
}

function build() {
    const size = sizeInput.valueAsNumber;
    if (!Number.isInteger(size) || size < 1 || size > 32) {
        statusOutput.textContent = "請輸入 1 到 32 的整數作為陣列長度。";
        return;
    }

    const entries = valueInput.value.trim().split(/\s+/).slice(0, size).map(Number);
    if (!entries.every(Number.isFinite)) {
        statusOutput.textContent = "請以空格分隔有效的數值。";
        return;
    }

    const nextValues = Array.from({ length: size + 1 }, (_, index) => entries[index - 1] ?? 0);
    const nextTree = new Array(size + 1).fill(0);
    for (let index = 1; index <= size; index++) {
        add(nextTree, index, nextValues[index]);
    }
    if (!nextTree.every(Number.isFinite)) {
        statusOutput.textContent = "總和超出可表示的範圍。請使用較小的數值。";
        return;
    }

    values = nextValues;
    tree = nextTree;
    for (const input of [updateInput, queryInput]) {
        input.max = size;
        const current = input.valueAsNumber;
        input.value = Number.isInteger(current) ? Math.max(1, Math.min(current, size)) : 1;
    }
    render();
    statusOutput.textContent = "已建立 " + size + " 項的樹狀陣列。";
}

function isIndex(index) {
    return Number.isInteger(index) && index > 0 && index < tree.length;
}

setup.addEventListener("submit", (event) => {
    event.preventDefault();
    build();
});

updates.addEventListener("submit", (event) => {
    event.preventDefault();
    const index = updateInput.valueAsNumber;
    const delta = deltaInput.valueAsNumber;
    if (!isIndex(index) || !Number.isFinite(delta)) {
        statusOutput.textContent = "請輸入有效的整數位置與增加量。";
        return;
    }

    const nextTree = tree.slice();
    const path = add(nextTree, index, delta);
    const nextValue = values[index] + delta;
    if (!Number.isFinite(nextValue) || !nextTree.every(Number.isFinite)) {
        statusOutput.textContent = "更新後的總和超出可表示的範圍。";
        return;
    }

    values[index] = nextValue;
    tree = nextTree;
    render();
    highlight(path);
    statusOutput.textContent = "更新 a[" + index + "] 後的值為 " + nextValue + "。\n受影響的節點 " + path.join(" → ");
});

queries.addEventListener("submit", (event) => {
    event.preventDefault();
    const index = queryInput.valueAsNumber;
    if (!isIndex(index)) {
        statusOutput.textContent = "請輸入有效的整數位置。";
        return;
    }

    const path = [];
    let sum = 0;
    for (let position = index; position > 0; position -= lowbit(position)) {
        path.push(position);
        sum += tree[position];
    }
    highlight(path);
    statusOutput.textContent = Number.isFinite(sum)
        ? "前綴和 prefix(" + index + ") = " + sum + "\n查詢經過的節點 " + path.join(" → ")
        : "前綴和超出可表示的範圍。";
});

clear.addEventListener("click", () => {
    highlight([]);
    statusOutput.textContent = "已清除標記。";
});

build();
demo.hidden = false;
