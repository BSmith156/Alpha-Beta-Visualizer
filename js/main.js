import { NodeManager } from "./node_manager.js";
import { Node } from "./node.js";

var node_manager = new NodeManager("canvas");

var startNode = new Node();
startNode.layer = 0;
startNode.max = true;
node_manager.nodes.push([startNode]);

node_manager.selected = startNode;
for (var i = 0; i < 3; i++) {
    node_manager.addChild();
};

for (const child of startNode.children) {
    node_manager.selected = child;
    for (var i = 0; i < 2; i++) {
        node_manager.addChild();
        node_manager.selected.children[i].value = Math.floor(Math.random() * (99 - -99 + 1) + -99);
    };
};

node_manager.selected = -1;
node_manager.reset();

node_manager.draw();