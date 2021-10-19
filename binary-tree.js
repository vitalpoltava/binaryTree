(function () {
  const TraverseTypes = {
    PRE_ORDER: 'PRE_ORDER',
    IN_ORDER: 'IN_ORDER',
    POST_ORDER: 'POST_ORDER',
  }

  const delimiter = '-';
  const NULL_STR = 'NULL';

  // Tree Traversal
  const traverse = (node, callbackFn, type = TraverseTypes.IN_ORDER) => {
    if (node !== null) {
      if (type === TraverseTypes.PRE_ORDER) callbackFn(node);
      traverse(node.left, callbackFn);
      if (type === TraverseTypes.IN_ORDER) callbackFn(node);
      traverse(node.right, callbackFn);
      if (type === TraverseTypes.POST_ORDER) callbackFn(node);
    }
  };

  // Create node
  const createBinaryNode = (key) => {
    const createdNode = {
      key,
      left: null,
      right: null,
      addLeft: (key) => {
        const addedLeft = createBinaryNode(key);
        createdNode.left = addedLeft;
        return addedLeft;
      },
      addRight: (key) => {
        const addedRight = createBinaryNode(key);
        createdNode.right = addedRight;
        return addedRight;
      }
    };

    return createdNode;
  };

  // Main binary tree factory
  const createBinaryTree = (rootKey) => {
    const root = createBinaryNode(rootKey);

    return  {
      root,
      print: (type = TraverseTypes.IN_ORDER) => {
        let treeStr = '';
        const visitFn = (node) => {
          if (treeStr) {
            treeStr += ` => ${node.key}`
          } else {
            treeStr += node.key
          }
        };

        traverse(root, visitFn, type);

        return treeStr;
      },
      serialize: () => {
        let serializedTree = '';
        const getNodeStr = (node) => {
          if (node === null) {
            serializedTree += delimiter + NULL_STR;
            return;
          } else {
            if (serializedTree) {
              serializedTree += delimiter + node.key;
            } else {
              serializedTree += node.key;
            }

          }
          getNodeStr(node.left)
          getNodeStr(node.right)
        }

        getNodeStr(root);
        return serializedTree;
      },
      deserialize: (serializedStr) => {
        const splitItems = serializedStr.split(delimiter);
        let index = 0;
        function makeTree(data){
          if (index >= splitItems.length) return null;
          if (data[index] === NULL_STR) {
            index++;
            return null;
          }
          const node = createBinaryNode(data[index++]);

          node.left = makeTree(data);
          node.right = makeTree(data);

          return node;
        }

        return makeTree(splitItems);
      },
    }
  }

  // Testing
  const tree = createBinaryTree('Root');
  const a = tree.root.addLeft('a');
  const b = tree.root.addRight('b');
  const e = a.addLeft('e');
  const i = a.addRight('i');
  const c = b.addLeft('c');
  const d = b.addRight('d');
  const o = e.addLeft('o');

  console.log(tree.print()); // IN_ORDER traversing type by default

})()
