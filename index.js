
document.getElementById('showFormButton').addEventListener('click', function() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm.style.display === 'none' || taskForm.style.display === '') {
        taskForm.style.display = 'block';
    } else {
        taskForm.style.display = 'none';
    }
});

document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const taskInput = document.getElementById('taskInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;

    // Create a new task element
    const li = document.createElement('li');
    li.innerHTML = `${taskInput} - <span>${dateInput} ${timeInput}</span>`;

    // Append the task to the task list
    document.getElementById('taskList').appendChild(li);

    // Schedule a reminder
    scheduleReminder(taskInput, dateInput, timeInput);

    // Clear input fields
    document.getElementById('taskForm').reset();

    // Hide the form again
    document.getElementById('taskForm').style.display = 'none';
});

function scheduleReminder(task, date, time) {
    const taskDateTime = new Date(`${date}T${time}`);
    const currentTime = new Date();
    const timeDifference = taskDateTime - currentTime;

    // Reminder 5 minutes before the task time
    const reminderTime = timeDifference - (5 * 60 * 1000);

    if (reminderTime > 0) {
        setTimeout(function() {
            alert(`Reminder: The task "${task}" is due in 5 minutes.`);
        }, reminderTime);
    } else {
        alert('The task time is already past or within 5 minutes.');
    }
}
// Request notification permission on page load
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

