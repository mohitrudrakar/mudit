class Stack {
  constructor() {
    this.items = [];
  }

  // Push to the top
  push(element) {
    this.items.push(element);
    this.render();
  }

  // Pop from the top
  pop() {
    if (!this.isEmpty()) {
      this.items.pop();
      this.render();
    } else {
      alert("Stack is empty!");
    }
  }

  // Peek at the top element without removing it
  peek() {
    if (!this.isEmpty()) {
      return this.items[this.items.length - 1];
    } else {
      return "Stack is empty!";
    }
  }

  // Push to the bottom using recursion
  pushAtBottom(element) {
    if (this.isEmpty()) {
      this.items.push(element);
    } else {
      let top = this.popItem(); // Temporarily store the top item
      this.pushAtBottom(element); // Recursively add to the bottom
      this.items.push(top); // Restore the top item
    }
    this.render();
  }

  // Pop without rendering (used in recursion)
  popItem() {
    return this.items.pop();
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Render stack elements in the UI
  render() {
    const stackDisplay = document.getElementById("stackDisplay");
    stackDisplay.innerHTML = ""; // Clear previous elements

    if (this.isEmpty()) {
      stackDisplay.innerHTML = `<p class="empty-message">Stack is empty!</p>`;
      return;
    }

    this.items.forEach((element) => {
      const div = document.createElement("div");
      div.className = "stack-element";
      div.textContent = element;
      stackDisplay.appendChild(div);
    });
  }
}

// Stack instance
const stack = new Stack();

// Push to the top
function pushToTop() {
  const input = document.getElementById("stackInput");
  const value = input.value.trim();
  if (value) {
    stack.push(value);
    input.value = ""; // Clear input
  } else {
    alert("Please enter a value!");
  }
}

// Push to the bottom
function pushToBottom() {
  const input = document.getElementById("stackInput");
  const value = input.value.trim();
  if (value) {
    stack.pushAtBottom(value);
    input.value = ""; // Clear input
  } else {
    alert("Please enter a value!");
  }
}

// Pop from the top
function popFromTop() {
  stack.pop();
}

// Peek at the top element
function peekTop() {
  const peekResult = stack.peek();
  document.getElementById(
    "peekResult"
  ).textContent = `Top Element: ${peekResult}`;
}
