class BinaryTree {
    constructor(canvas) {
        this.root = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.drawTree();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    drawTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(this.root, this.canvas.width / 2, 40, this.canvas.width / 4);
    }

    drawNode(node, x, y, offset) {
        if (node !== null) {
            this.ctx.fillStyle = '#007bff';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(node.value, x - 10, y + 5);
            
            if (node.left) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x - offset, y + 60);
                this.ctx.stroke();
                this.drawNode(node.left, x - offset, y + 60, offset / 2);
            }
            if (node.right) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + offset, y + 60);
                this.ctx.stroke();
                this.drawNode(node.right, x + offset, y + 60, offset / 2);
            }
        }
    }
}