export function setSelectedNode(node, isRoot) {
    var unselectedTxt = document.getElementById("unselectedText");
    var nodeDiv = document.getElementById("nodeOptions");
    var deleteButton = document.getElementById("deleteNode");
    if (node == null) {
        unselectedTxt.style.display = "block";
        nodeOptions.style.display = "none"; 
    } else {
        unselectedTxt.style.display = "none"; 
        nodeOptions.style.display = "block";
    };
    if (isRoot) {
        deleteNode.style.display = "none";
    } else {
        deleteNode.style.display = "block";
    };
};