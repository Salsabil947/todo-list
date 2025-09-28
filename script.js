document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const emptyImage = document.getElementById('emptyImage'); // Fixed: Use getElementById for ID
    const todoContainer = document.querySelector('.todo-container');
    const inputForm = document.querySelector('.input-area'); // For form submit prevention
    const prograssBar = document.getElementById('progress');
    const prograssNumbers = document.getElementById('numbers');

    // Basic error check: Exit if required elements are missing
    if (!taskInput || !addTaskButton || !taskList || !emptyImage || !todoContainer) {
        console.error('Required DOM elements not found. Check your HTML.');
        return;
    }

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todoContainer.style.width = taskList.children.length > 0 ? '100%' : '50%'; // Fixed units
    };

    const updateProgress = (checkCopmletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        prograssBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%'; 

        prograssNumbers.textContent = `${completedTasks} / ${totalTasks}`;
        if (checkCopmletion && totalTasks > 0 && completedTasks === totalTasks) {
            Confetti();
        }
    };

    const addTask = (text, completed = false, checkCopmletion = true) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span class="task-text">${taskText}</span>
            <div class="task-buttons">
                <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-button');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            updateProgress();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
            }
        });

        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCopmletion);
    };

    // Event listeners
    addTaskButton.addEventListener('click', () => addTask());

    // Keypress on input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Form submit prevention (extra safety, even with type="button")
    if (inputForm) {
        inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addTask();
        });
    }

    // Initial state
    toggleEmptyState();
});

const Confetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});

};