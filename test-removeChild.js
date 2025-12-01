// Test file to verify the removeChild fix
console.log('Testing removeChild fix...');

// Test the safer removal approach
function safeRemoveChild(parent, child) {
  if (parent && child && child.parentNode === parent) {
    parent.removeChild(child);
    console.log('Child removed safely');
  } else {
    console.log('Child was not a child of the parent, avoiding error');
  }
}

// Test 1: Normal case where child is part of parent
const parent1 = document.createElement('div');
const child1 = document.createElement('div');
parent1.appendChild(child1);
safeRemoveChild(parent1, child1); // Should remove safely

// Test 2: Child that's been removed already
const parent2 = document.createElement('div');
const child2 = document.createElement('div');
parent2.appendChild(child2);
parent2.removeChild(child2); // Remove it first
safeRemoveChild(parent2, child2); // Should avoid error

// Test 3: Child is not part of any parent
const parent3 = document.createElement('div');
const child3 = document.createElement('div');
// Don't append child3 to parent3
safeRemoveChild(parent3, child3); // Should avoid error

console.log('All tests completed without errors!');