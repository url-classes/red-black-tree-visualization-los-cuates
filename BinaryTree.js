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

    inorder(node) {
        const result = [];
        this._inorder(node, result);
        return result;
    }

    _inorder(node, result) {
        if (node !== null) {
            this._inorder(node.left, result);
            result.push(node.value);
            this._inorder(node.right, result);
        }
    }

    preorder(node) {
        const result = [];
        this._preorder(node, result);
        return result;
    }

    _preorder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preorder(node.left, result);
            this._preorder(node.right, result);
        }
    }

    postorder(node) {
        const result = [];
        this._postorder(node, result);
        return result;
    }

    _postorder(node, result) {
        if (node !== null) {
            this._postorder(node.left, result);
            this._postorder(node.right, result);
            result.push(node.value);
        }
    }

    drawTraversal(traversal) {
        // Dibuja el árbol de nuevo
        this.drawTree(); // Redibuja el árbol antes de dibujar los recorridos
    
        // Espaciado horizontal y vertical para el recorrido
        const xOffset = 100; // Espaciado horizontal
        const yOffset = this.canvas.height - 100; // Espaciado vertical desde la parte inferior
    
        // Dibuja cada nodo del recorrido en una línea horizontal
        traversal.forEach((value, index) => {
            const x = (index + 1) * xOffset; // Calcula la posición x
            this.ctx.fillStyle = '#007bff';
            this.ctx.beginPath();
            this.ctx.arc(x, yOffset, 20, 0, Math.PI * 2); // Dibuja un círculo
            this.ctx.fill();
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(value, x - 10, yOffset + 5); // Dibuja el valor del nodo
        });
    }
    
    
}
