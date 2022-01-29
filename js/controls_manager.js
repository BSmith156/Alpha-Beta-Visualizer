export function setSelectedNode(node, isRoot) {
    var unselectedTxt = document.getElementById("unselectedText");
    var nodeDiv = document.getElementById("nodeOptions");
    var deleteButton = document.getElementById("deleteNode");
    var staticDiv = document.getElementById("static");
    var staticInput = document.getElementById("staticValue");
    if (node == null) {
        unselectedTxt.style.display = "block";
        nodeOptions.style.display = "none"; 
    } else {
        unselectedTxt.style.display = "none"; 
        nodeOptions.style.display = "block";
        if (node.value != null) {
            staticDiv.style.display = "block";
            staticInput.value = node.value;
        } else {
            staticDiv.style.display = "none"
        };
    };
    if (isRoot) {
        deleteNode.style.display = "none";
    } else {
        deleteNode.style.display = "block";
    };
};