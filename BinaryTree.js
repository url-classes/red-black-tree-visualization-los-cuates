class BinaryTree {
    constructor(canvas) {
        this.root = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            newNode.color = 'black'; // La raíz es negra
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
            this.fixTree(newNode);
        }
        this.drawTree();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
                newNode.parent = node;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
                newNode.parent = node;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    fixTree(node) {
        while (node !== this.root && node.parent.color === 'red') {
            if (node.parent === node.parent.parent.left) {
                let uncle = node.parent.parent.right;
                if (uncle && uncle.color === 'red') {
                    // Caso 1: El tío es rojo
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        // Caso 2: El tío es negro y el nodo es derecho
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    // Caso 3: El tío es negro y el nodo es izquierdo
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateRight(node.parent.parent);
                }
            } else {
                let uncle = node.parent.parent.left;
                if (uncle && uncle.color === 'red') {
                    // Caso 1: El tío es rojo
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        // Caso 2: El tío es negro y el nodo es izquierdo
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    // Caso 3: El tío es negro y el nodo es derecho
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateLeft(node.parent.parent);
                }
            }
        }
        this.root.color = 'black'; // Asegúrate de que la raíz sea negra
    }

    rotateLeft(node) {
        const rightChild = node.right;
        node.right = rightChild.left;
        if (rightChild.left !== null) {
            rightChild.left.parent = node;
        }
        rightChild.parent = node.parent;
        if (node.parent === null) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
        rightChild.left = node;
        node.parent = rightChild;
    }

    rotateRight(node) {
        const leftChild = node.left;
        node.left = leftChild.right;
        if (leftChild.right !== null) {
            leftChild.right.parent = node;
        }
        leftChild.parent = node.parent;
        if (node.parent === null) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }
        leftChild.right = node;
        node.parent = leftChild;
    }

    drawTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(this.root, this.canvas.width / 2, 40, this.canvas.width / 4);
    }

    drawNode(node, x, y, offset) {
        if (node !== null) {
            // Cambia el color de relleno según el color del nodo
            this.ctx.fillStyle = node.color === 'red' ? 'red' : 'black';
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
    
    



