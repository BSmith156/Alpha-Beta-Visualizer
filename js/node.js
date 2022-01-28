export function Node() {
    this.pos = [0, 0];
    this.children = [];
};

Node.prototype.draw = function(ctx) {
    for (const node of this.children) {
        ctx.lineWidth = Math.max(1, parseInt(Node.radius / 25));
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1] + Node.radius - 1);
        ctx.lineTo(node.pos[0], node.pos[1] - Node.radius + 1);
        ctx.stroke();
        node.draw(ctx);
    };
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], Node.radius, 0, 2 * Math.PI);
    if (this.max) {
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = Math.max(1, parseInt(Node.radius / 10));
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    } else {
        ctx.fillStyle = "#000000";
        ctx.fill();
    };
}

Node.radius = 0