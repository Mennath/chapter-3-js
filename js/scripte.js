//localStorage = ده المكان Browser نستطيع تخزين بيانات فيه
//JSON = لانه يخزن البيانات كنصوص استرنج علشان كده هنحوله ل اراااي array
let tasks = JSON.parse(localStorage.getItem("#tasks")) || [];
// SHOW TASKS WHEN PAGE LOADS
displayTasks();
function addTask() { //IMP//  عند نداء علي ده نفذ الكود الي جوه كله 
    // Get values from inputs
    // document.querySelector("taskName") = html للحصول علي قيمه انبوت داخل 
    // value = Input معنها القيمة التي كتبها المستخدم داخل 
    // trim() تحذف المسافات الزائدة من بداية ونهاية النص.   //"   Hello   ".trim() تصبح:"Hello"
    let taskName = document.querySelector("#taskName").value; // input 1
    let taskDescription =document.querySelector("#taskDescription").value; // input 2
    // Check empty inputs
    //  || او 
    if (taskName === "" || taskDescription === "") { // لو المكان فارج طلع الامر ده 
        alert("Please enter task name and description"); // alert من داخل السيلفر او البراوزر
        return; //Function أوقف الـ 
        //  هنا ولا تكمل باقي الكود.
    } 
    // Create new task //جديد Object إنشاء 
    // انا الي هدخلو
    let newTask = {  //*** */
        // id: Date.now(),
        name: taskName, // ده انا الي هدخلو // input 1
        description: taskDescription, //  ده انا الي هدخلو // input 2
        status: "created"
    };
    // push = array اضافه عنصر الي 
    tasks.push(newTask);//*** */
    saveTasks(); // localStorage.Tasks  احفظ الـ الموجودة حالياً في  
    // Clear inputs 
    document.querySelector("#taskName").value = ""; 
    document.querySelector("#taskDescription").value = "";
    // Display tasks
    displayTasks();
}

function displayTasks(filter = "all") {
    let tableBody = document.querySelector("#taskTableBody");
    // Clear old rows فاضي الجدول قبل ما تعرض البيانات الجديدة
    tableBody.innerHTML = "";
    // Filter tasks
    let filteredTasks = tasks.filter(function (task) {
        if (filter === "all") {
            return true;
        }
        return task.status === filter;
    });
    // Create HTML for every task
    filteredTasks.forEach(function (task) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>
                ${task.name}
            </td>
            <td>
                ${task.description}
            </td>
            <td>
                <span class="${
                    task.status === "done"
                        ? "status-done"
                        : "status-created"
                }">
                   ${
                        task.status === "done"
                            ? "Done"
                            : "Created"
                    }
                </span>
            </td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" >
                 <i class="bi bi-trash"></i>
                </button>
                <button
                    class="action-btn edit-btn" onclick="openEditModal(${task.id})" >
                   <i class="bi bi-pencil-square"></i>
                </button>
                ${
                    task.status === "created" ? `
                    <button class="action-btn done-btn"onclick="markAsDone(${task.id})">
                        <i class="bi bi-check-lg"></i>
                    </button>
                    `
                    : ""
                }
            </td>

        `;
        tableBody.appendChild(row);

    });

}

function deleteTask(id) {
    let confirmDelete =  confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) {
        return;
    }
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });
    // saveTasks();
    displayTasks();
}
// MARK TASK AS DONE
function markAsDone(id) {
    let task = tasks.find(function (task) {
        return task.id === id;
    });
    if (task) {
        task.status = "done";
    }
    // saveTasks();
    displayTasks();
}

// FILTER TASKS
function filterTasks(type) {
    displayTasks(type);
}
// OPEN EDIT MODAL 
function openEditModal(id) {
    let task = tasks.find(function (task) {
        return task.id === id;
    });
    if (!task) {
        return;
    }
    // Put task data inside modal
    document.getElementById("editTaskId").value =task.id;
    document.getElementById("editTaskName").value = task.name;
    document.getElementById("editTaskDescription").value =  task.description;
    // Open Bootstrap Modal
    let modal =  new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
}
// 
// UPDATE TASK
// 

function updateTask() {
    let id = Number( document.getElementById("editTaskId").value );
    let name = document.getElementById("editTaskName").value;
    let description = document.getElementById("editTaskDescription").value;
    if (name === "" || description === "") {
        alert("Please fill all fields");
        return;
    }
    let task = tasks.find(function (task) {
        return task.id === id;
    });
    if (task) {
        task.name = name;
        task.description = description;
    }
    saveTasks();
    displayTasks();
    // Close modal
    let modalElement = document.getElementById("editModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}
// SAVE TASKS IN LOCAL STORAGE
function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}