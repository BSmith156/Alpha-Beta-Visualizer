export function Node() {
    this.pos = [0, 0];
    this.children = [];
    this.value = 0;
    this.pruned = false;
};

Node.prototype.setPruned = function() {
    this.pruned = true;
    for (const child of this.children) {
        child.setPruned();
    };
};

Node.prototype.minimax = function(alpha, beta) {
    if (this.value != null) {
        return this.value;
    };

    if (this.max) {
        this.value = Number.NEGATIVE_INFINITY;
        var done = false;
        for (const child of this.children) {
            if (done) {
                child.setPruned();
                continue;
            };
            var childValue = child.minimax(alpha, beta);
            this.value = Math.max(this.value, childValue);
            alpha = Math.max(alpha, childValue);
            if (beta <= alpha) {
                done = true;
            };
        };
        return this.value;
    } else {
        this.value = Number.POSITIVE_INFINITY;
        var done = false;
        for (const child of this.children) {
            if (done) {
                child.setPruned();
                continue;
            };
            var childValue = child.minimax(alpha, beta);
            this.value = Math.min(this.value, childValue);
            beta = Math.min(beta, childValue);
            if (beta <= alpha) {
                done = true;
            };
        };
        return this.value;
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
    if (this.value != null) {
        ctx.fillText(this.value, this.pos[0], this.pos[1]);
    };
};

Node.radius = 0