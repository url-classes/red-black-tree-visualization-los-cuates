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
        this.root.color = 'black'; // Asegura que la raíz siempre sea negra
    }

    rotateLeft(node) {
        const rightNode = node.right;
        node.right = rightNode.left;
        if (rightNode.left !== null) {
            rightNode.left.parent = node;
        }
        rightNode.parent = node.parent;
        if (node.parent === null) {
            this.root = rightNode;
        } else if (node === node.parent.left) {
            node.parent.left = rightNode;
        } else {
            node.parent.right = rightNode;
        }
        rightNode.left = node;
        node.parent = rightNode;
    }

    rotateRight(node) {
        const leftNode = node.left;
        node.left = leftNode.right;
        if (leftNode.right !== null) {
            leftNode.right.parent = node;
        }
        leftNode.parent = node.parent;
        if (node.parent === null) {
            this.root = leftNode;
        } else if (node === node.parent.left) {
            node.parent.left = leftNode;
        } else {
            node.parent.right = leftNode;
        }
        leftNode.right = node;
        node.parent = leftNode;
    }

    drawTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpia el canvas antes de dibujar
        if (this.root) {
            this.drawNode(this.root, this.canvas.width / 2, 30, 100); // Llama al método para dibujar el árbol
        }
    }

    drawNode(node, x, y, offset) {
        if (node) {
            // Dibuja el nodo
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(node.value, x - 5, y + 5);
            this.ctx.font = '24px Arial';

            // Dibuja la línea hacia el nodo izquierdo
            if (node.left) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + 20); // Parte inferior del nodo actual
                this.ctx.lineTo(x - offset, y + 60 - 20); // Parte superior del nodo izquierdo
                this.ctx.stroke();
            }

            // Dibuja la línea hacia el nodo derecho
            if (node.right) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + 20); // Parte inferior del nodo actual
                this.ctx.lineTo(x + offset, y + 60 - 20); // Parte superior del nodo derecho
                this.ctx.stroke();
            }

            // Llama recursivamente para los nodos izquierdo y derecho
            this.drawNode(node.left, x - offset, y + 60, offset / 2);
            this.drawNode(node.right, x + offset, y + 60, offset / 2);
        }
    }

    preorder(node) {
        const result = [];
        this.preorderTraversal(node, result);
        return result;
    }

    preorderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
    }

    inorder(node) {
        const result = [];
        this.inorderTraversal(node, result);
        return result;
    }

    inorderTraversal(node, result) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.value);
            this.inorderTraversal(node.right, result);
        }
    }

    postorder(node) {
        const result = [];
        this.postorderTraversal(node, result);
        return result;
    }

    postorderTraversal(node, result) {
        if (node) {
            this.postorderTraversal(node.left, result);
            this.postorderTraversal(node.right, result);
            result.push(node.value);
        }
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (node === null) {
            return null; // Nodo no encontrado
        }
        if (node.value === value) {
            return node; // Nodo encontrado
        }
        return value < node.value
            ? this.searchNode(node.left, value) // Busca en el subárbol izquierdo
            : this.searchNode(node.right, value); // Busca en el subárbol derecho
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
        this.drawTree(); // Asegúrate de que se redibuje el árbol
    }

    _deleteNode(node, value) {
        if (node === null) {
            return null; // Si el nodo no existe, retorna null
        }
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value); // Busca en el subárbol izquierdo
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value); // Busca en el subárbol derecho
        } else {
            // Nodo encontrado
            if (node.left === null || node.right === null) {
                const temp = node.left !== null ? node.left : node.right; // Nodo a eliminar
                if (temp === null) {
                    return null; // Nodo hoja
                } else {
                    return temp; // Nodo con un hijo
                }
            } else {
                const temp = this._findMin(node.right); // Encuentra el sucesor
                node.value = temp.value; // Reemplaza el valor
                node.right = this._deleteNode(node.right, temp.value); // Elimina el sucesor
            }
        }
        this.fixAfterDelete(node); // Llama a fixAfterDelete siempre después de la eliminación
        return node; // Retorna el nodo modificado
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node; // Devuelve el nodo mínimo
    }

    fixAfterDelete(node) {
        while (node !== this.root && node.color === 'black') {
            if (node === node.parent.left) {
                let sibling = node.parent.right;

                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    node.parent.color = 'red';
                    this.rotateLeft(node.parent);
                    sibling = node.parent.right;
                }

                if (sibling.left.color === 'black' && sibling.right.color === 'black') {
                    sibling.color = 'red';
                    node = node.parent;
                } else {
                    if (sibling.right.color === 'black') {
                        sibling.left.color = 'black';
                        sibling.color = 'red';
                        this.rotateRight(sibling);
                        sibling = node.parent.right;
                    }
                    sibling.color = node.parent.color;
                    node.parent.color = 'black';
                    sibling.right.color = 'black';
                    this.rotateLeft(node.parent);
                    node = this.root; // Salimos del bucle
                }
            } else {
                let sibling = node.parent.left;

                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    node.parent.color = 'red';
                    this.rotateRight(node.parent);
                    sibling = node.parent.left;
                }

                if (sibling.right.color === 'black' && sibling.left.color === 'black') {
                    sibling.color = 'red';
                    node = node.parent;
                } else {
                    if (sibling.left.color === 'black') {
                        sibling.right.color = 'black';
                        sibling.color = 'red';
                        this.rotateLeft(sibling);
                        sibling = node.parent.left;
                    }
                    sibling.color = node.parent.color;
                    node.parent.color = 'black';
                    sibling.left.color = 'black';
                    this.rotateRight(node.parent);
                    node = this.root; // Salimos del bucle
                }
            }
        }
        node.color = 'black'; // Asegúrate de que la raíz sea negra
    }
}