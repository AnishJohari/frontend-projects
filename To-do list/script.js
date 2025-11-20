const btn = document.getElementById('btn');
const inp = document.getElementById('inp');
const tasklist = document.querySelector('.list');

// 1. Move task creation logic INSIDE the 'btn' click handler
btn.addEventListener('click', () => {
    // Check if the input is empty before adding a task
    if (inp.value.trim() === "") {
        console.log("Input field is empty. Task not added.");
        return; 
    }
    
    console.log(inp.value);

    // Template string for the new task structure
    const str = `
        <input type="checkbox" class="check">  
        <p>${inp.value}</p>
        <span class="uparrow">&#8593;</span>
        <span class="bin">&#128465;</span>   
        <span class="downarrow">&#8595;</span>
    `;

    const div = document.createElement('div');
    div.innerHTML = str;
    div.classList.add('task');
    
    // Add the new task to the list
    tasklist.append(div);
    
    // Clear the input field
    inp.value = "";
});


// 2. Event Delegation for task interactions
tasklist.addEventListener('click', (e) => {
    const targetClass = e.target.getAttribute('class');
    console.log(targetClass);

    if (targetClass === "check") {
        // FIX: Use classList.toggle() instead of just .toggle()
        e.target.nextElementSibling.classList.toggle('completed'); 
    } 
    else if (targetClass === "bin") {
        e.target.parentElement.remove(); // Removed one '.parentElement' for cleaner removal
    } 
    else if (targetClass === "uparrow") {
        const currentTask = e.target.parentElement;
        const previousTask = currentTask.previousElementSibling;
        
        // Logic to move the element up
        if (previousTask) {
            // Inserts the current task before the previous one
            tasklist.insertBefore(currentTask, previousTask); 
        }
    }
    else if (targetClass === "downarrow") {
        const currentTask = e.target.parentElement;
        const nextTask = currentTask.nextElementSibling;
        
        // Logic to move the element down
        if (nextTask) {
            // Inserts the next task before the current task's next sibling (which is two spots down)
            tasklist.insertBefore(nextTask, currentTask);
        }
    }
});