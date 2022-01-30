export function Node() {
    this.pos = [0, 0];
    this.children = [];
    this.value = 0;
    this.pruned = false;
    this.step = 0;
};

Node.prototype.setPruned = function() {
    this.pruned = true;
    for (const child of this.children) {
        child.setPruned();
    };
};

// Modified so algorithm can be stepped through
Node.prototype.minimax = function() {
    if (this.step == 0) {
        this.childSearchDone = false
        this.currentChildSearch = 0;
        if (this.children.length == 0) {
            if (this.parent != null) {
                this.parent.return = this.value;
            };
            if (this.parent == null) {
                return this.parent;
            };
            return this.parent.minimax();
        };
        if (this.max) {
            this.value = Number.NEGATIVE_INFINITY;
        } else {
            this.value = Number.POSITIVE_INFINITY;
        };
        this.step += 1;
    };
    if (this.step == 1) {
        if (this.currentChildSearch == this.children.length) {
            if (this.parent != null) {
                this.parent.return = this.value;
            };
            if (this.parent == null) {
                return this.parent;
            };
            return this.parent.minimax();;
        };
        if (this.childSearchDone) {
            for (var i = this.currentChildSearch; i < this.children.length; i++) {
                this.children[i].setPruned();
            };
            this.currentChildSearch = this.children.length;
            return this;
        };
        var child = this.children[this.currentChildSearch];
        child.alpha = this.alpha;
        child.beta = this.beta;
        this.step += 1;
        return child;
    } else if (this.step == 2) {
        var childValue = this.return
        if (this.max) {
            this.value = Math.max(this.value, childValue);
            this.alpha = Math.max(this.alpha, childValue);
        } else {
            this.value = Math.min(this.value, childValue);
            this.beta = Math.min(this.beta, childValue);
        };
        if (this.beta <= this.alpha) {
            this.childSearchDone = true;
        };
        this.currentChildSearch += 1;
        this.step -= 1;
        return this;
    };
};

Node.prototype.draw = function(ctx) {
    var blackValue = "#000000";
    if (this.pruned) {
        blackValue = "#bbbbbb";
    };
    for (const node of this.children) {
        ctx.lineWidth = Math.max(1, parseInt(Node.radius / 25));
        if (node.pruned) {
            ctx.strokeStyle = "#bbbbbb";
        } else {
            ctx.strokeStyle = "#000000";
        };
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1] + Node.radius - 1);
        ctx.lineTo(node.pos[0], node.pos[1] - Node.radius + 1);
        ctx.stroke();
        node.draw(ctx);
    };
    ctx.font = Node.radius + "px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], Node.radius, 0, 2 * Math.PI);
    if (this.max) {
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = Math.max(1, parseInt(Node.radius / 10));
        ctx.strokeStyle = blackValue;
        ctx.stroke();
        ctx.fillStyle = blackValue;
    } else {
        ctx.fillStyle = blackValue;
        ctx.fill();
        ctx.fillStyle = "#ffffff";
    };
    if (this.value != null && this.value != Number.POSITIVE_INFINITY && this.value != Number.NEGATIVE_INFINITY) {
        ctx.fillText(this.value, this.pos[0], this.pos[1]);
    };
};

Node.radius = 0