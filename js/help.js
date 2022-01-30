let pages = ['<h2 class="help-title mb-3">Alpha-Beta Visualizer</h2><p class="help-text">A browser tool to visualize the <nobr>alpha-beta</nobr> pruning optimization technique for the minimax algorithm.</p><p class="help-text">This short help section will first briefly summarise the alpha-beta pruning technique, and then quickly go through how to use the tool.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Alpha-Beta Pruning</h2><p class="help-text">Alpha-beta pruning is an optimisation technique used to improve the minimax algorithm for adversarial search problems.</p><p class = "help-text">It helps speed up searching by skipping (pruning) branches that are guaranteed not to contain the solution to the problem. To do this it keeps track of two values, alpha and beta, for each node in the tree.</p><p class="help-text">Check out the <a href = "https://en.wikipedia.org/wiki/Alpha-beta_pruning" target = "_blank">Wikipedia page</a> for more information.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Visualization</h2><p class="help-text">The white and black nodes represent maximizing and minimizing nodes respectively. Nodes with no children are statically evaluated nodes, with their static value displayed on them.</p><p class="help-text">You can either run or step through the visualization. Running the visualization will simply execute the <nobr>alpha-beta</nobr> algorithm, whereas stepping through will allow you to see each step of the algorithm as it executes. You can also reset the visualization which will revert the tree back to how it was before the algorithm began.</p><p class = "help-text">When executing the algorithm, alpha and beta values will be shown above their corresponding nodes. When a branch is pruned it will be shown as greyed out in the tree.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Nodes</h2><p class="help-text">Clicking on a node in the tree will select it, once selected you can edit the node from the node options menu.</p><p class="help-text">You can add children to and remove any node within the tree (with exception of the root node, which can not be removed). Child nodes are added to the right and will always be of opposite colour to their parent. If a node is statically evaluated, you can also change its static evaluation value from within the node options menu.</p><p class="help-text">Please note, you must reset any current visualizations before being able to edit any nodes.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
             '<h2 class="help-title mb-3">Enjoy!</h2><p class="help-text">If you want to look at the source code, or just have some suggestions, then check out the <a href="https://github.com/BSmith156/Alpha-Beta-Visualizer" target="_blank">GitHub page</a>.</p><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>'];
let current = -1;

// Display next help page
export function helpNext() {
    if(current < pages.length - 1){
        current++;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Display previous help page
function helpBack() {
    if(current > 0){
        current--;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Close help
function helpClose() {
    document.getElementById("help").style.display = "none";
    document.getElementById("main").style.display = "block";
}

// Reset button listeners
function resetListeners(){
    if(document.getElementById("helpNext")) {
        document.getElementById("helpNext").addEventListener("click", helpNext);
    }
    if(document.getElementById("helpBack")) {
        document.getElementById("helpBack").addEventListener("click", helpBack);
    }
    if(document.getElementById("helpClose")) {
        document.getElementById("helpClose").addEventListener("click", helpClose);
    }
}