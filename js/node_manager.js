import { setSelectedNode } from "./controls_manager.js";
import { onResize } from "./helpers.js";
import { Node } from "./node.js";

export function NodeManager(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext("2d");
    this.nodes = [];
    this.selected = null;
    this.bottomLayerCount = null;

    window.addEventListener("resize", this.draw.bind(this));
    canvas.addEventListener("mousedown", this.onMouseClick.bind(this));
    
    document.getElementById("run").addEventListener("click", this.run.bind(this));
    document.getElementById("reset").addEventListener("click", this.reset.bind(this));

    document.getElementById("addChild").addEventListener("click", this.addChild.bind(this));
    document.getElementById("deleteNode").addEventListener("click", this.deleteNode.bind(this));
    document.getElementById("setValue").addEventListener("click", this.setValue.bind(this));
}

NodeManager.prototype.reset = function() {
    if (this.selected != -1) {
        return;
    };
    this.selected = null;
    for (const nodeLayer of this.nodes) {
        for (const node of nodeLayer) {
            node.pruned = false;
            if (node.children.length != 0) {
                node.value = null;
            };
        };
    };
    setSelectedNode(this.selected, this.selected == this.nodes[0][0]);
    this.draw();
};

NodeManager.prototype.run = function() {
    this.selected = -1;
    setSelectedNode(this.selected, this.selected == this.nodes[0][0]);
    this.nodes[0][0].minimax(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    this.draw();
};

NodeManager.prototype.setValue = function() {
    var value = document.getElementById("staticValue").value;
    if(isNaN(value) || value == "") {
        value = 0;
    } else {
        value = Number.parseInt(value);
        value = Math.min(99, Math.max(-99, value));
    }
    this.selected.value = value;
    document.getElementById("staticValue").value = value;
    this.draw();
}

NodeManager.prototype.addChild = function() {
    if (this.selected == null) {
        return;
    };
    this.selected.value = null;
    var newNode = new Node();
    newNode.layer = this.selected.layer + 1;
    newNode.max = !this.selected.max;
    this.selected.children.push(newNode);
    if (newNode.layer == this.nodes.length) {
        this.nodes.push([]);
    };
    this.nodes[newNode.layer].push(newNode);
    this.bottomLayerCount = null;
    setSelectedNode(this.selected, this.selected == this.nodes[0][0]);
    this.draw();
};

NodeManager.prototype.deleteNode = function() {
    if (this.selected == null || this.selected.layer == 0) {
        return;
    };
    var nodeStack = [this.selected];
    while (nodeStack.length != 0) {
        var node = nodeStack.pop();
        for (var i = 0; i < this.nodes[node.layer].length; i++) {
            if (this.nodes[node.layer][i] == node) {
                this.nodes[node.layer].splice(i, 1);
                break;
            };
        };
        for (const child of node.children.slice().reverse()) {
            nodeStack.push(child);
        };
    };
    for (var i = this.nodes.length - 1; i >= 0; i--) {
        if (this.nodes[i].length == 0) {
            this.nodes.splice(i, 1);
        };
    };
    var done = false;
    for (const node of this.nodes[this.selected.layer - 1]) {
        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i] == this.selected) {
                node.children.splice(i, 1);
                if (node.children.length == 0) {
                    node.value = 0;
                };
                done = true;
                break;
            };
        };
        if (done) {
            break;
        };
    };
    this.selected = null;
    setSelectedNode(this.selected, this.selected == this.nodes[0][0]);
    this.bottomLayerCount = null;
    this.draw();
};

NodeManager.prototype.onMouseClick = function(event) {
    if (this.selected == -1) {
        return;
    };
    this.selected = null;
    for (const nodeLayer of this.nodes) {
        for (const node of nodeLayer) {
            var dist = Math.sqrt(Math.pow(event.offsetX - node.pos[0], 2) + Math.pow(event.offsetY - node.pos[1], 2));
            if (dist <= Node.radius) {
                this.selected = node;
                break;
            };
        };
        if (this.selected != null) {
            break;
        };
    };
    setSelectedNode(this.selected, this.selected == this.nodes[0][0]);
    this.draw();
};

NodeManager.prototype.setNodeRadius = function() {
    if (this.bottomLayerCount == null) {
        this.bottomLayerCount = 0;
        var nodeStack = [this.nodes[0][0]];
        while (nodeStack.length != 0) {
            var node = nodeStack.pop();
            if (node.children.length == 0) {
                this.bottomLayerCount += 1;
            } else {
                for (const child of node.children.slice().reverse()) {
                    nodeStack.push(child);
                };
            };
        };
    };
    var xDiam = this.canvas.width / (0.5 + 1.5 * this.bottomLayerCount);
    var yDiam = this.canvas.height / (0.5 + 1.5 * this.nodes.length);
    Node.radius = Math.min(xDiam, yDiam) / 2;
};

NodeManager.prototype.setNodePositions = function() {
    var xOffset = (this.canvas.width - Node.radius * (1 + 3 * this.bottomLayerCount)) / 2;
    var yOffset = (this.canvas.height - Node.radius * (1 + 3 * this.nodes.length)) / 2;
    var count = 2;
    var nodeStack = [this.nodes[0][0]];
    while (nodeStack.length != 0) {
        var node = nodeStack.pop();
        if (node.children.length == 0) {
            node.pos[0] = xOffset + count * Node.radius;
            node.pos[1] = yOffset + (2 + 3 * node.layer) * Node.radius;
            count += 3;
        } else {
            for (const child of node.children.slice().reverse()) {
                nodeStack.push(child);
            };
        };
    };
    for (const nodeLayer of this.nodes.slice(0, -1).reverse()) {
        for (const node of nodeLayer) {
            if (node.children.length != 0) {
                node.pos[0] = (node.children[0].pos[0] + node.children.at(-1).pos[0]) / 2;
                node.pos[1] = yOffset + (2 + 3 * node.layer) * Node.radius;
            };
        };
    };
};

NodeManager.prototype.draw = function() {
    onResize();
    this.setNodeRadius();
    this.setNodePositions();
    this.nodes[0][0].draw(this.ctx);

    if (this.selected != null && this.selected != -1) {
        this.ctx.lineWidth = Math.max(1, parseInt(Node.radius / 10));
        this.ctx.strokeStyle = "#ff0000";
        this.ctx.beginPath();
        this.ctx.arc(this.selected.pos[0], this.selected.pos[1], Node.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    };
};