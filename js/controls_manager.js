export function setSelectedNode(node, isRoot) {
    var unselectedTxt = document.getElementById("unselectedText");
    var nodeDiv = document.getElementById("nodeOptions");
    var deleteButton = document.getElementById("deleteNode");
    var staticDiv = document.getElementById("static");
    var staticInput = document.getElementById("staticValue");
    var runningText = document.getElementById("runningText");
    if (node == -1) {
        unselectedTxt.style.display = "none";
        runningText.style.display = "block";
        nodeOptions.style.display = "none";
        return;
    };
    if (node == null) {
        runningText.style.display = "none";
        unselectedTxt.style.display = "block";
        nodeOptions.style.display = "none"; 
    } else {
        runningText.style.display = "none";
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