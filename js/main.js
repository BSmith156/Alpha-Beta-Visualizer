import { NodeManager } from "./node_manager.js";
import { Node } from "./node.js";

var node_manager = new NodeManager("canvas");

var startNode = new Node();
startNode.layer = 0;
startNode.max = true;
node_manager.nodes.push([startNode]);

node_manager.draw();