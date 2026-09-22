// //localStorage = ده المكان Browser نستطيع تخزين بيانات فيه
// //JSON = لانه يخزن البيانات كنصوص استرنج علشان كده هنحوله ل اراااي array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// SHOW TASKS WHEN PAGE LOADS
 let taskName = document.querySelector("#taskName").value; // input 1
 let taskDescription =document.querySelector("#taskDescription").value; // input 2
 let count = document.querySelector("#count").value; // input 3
 console.log(taskName, taskDescription, count);
function addTask() { //IMP//  عند نداء علي ده نفذ الكود الي جوه كله 
    // Get values from inputs
    // document.getElementById("taskName") = html للحصول علي قيمه انبوت داخل 
    // value = Input معنها القيمة التي كتبها المستخدم داخل 
    // تحذف المسافات الزائدة من بداية ونهاية النص.   //"   Hello   ".trim() تصبح:"Hello"
    let taskName = document.getElementById("taskName").value; // input 1
    let taskDescription =document.getElementById("taskDescription").value; // input 2
    let count = document.getElementById("count").value; // input 3
    // Check empty inputs
    //  || او 
    if (taskName === "" || taskDescription === "" || count === "") { // لو المكان فارج طلع الامر ده 
        alert("Please enter task name and description");
        return; //Function أوقف الـ 
        //  هنا ولا تكمل باقي الكود.
    } 
    // Create new task //جديد Object إنشاء 
    let newTask = {  //*** */
        // id: Date.now(),
        name: taskName, // ده انا الي هدخلو 
        description: taskDescription, //  ده انا الي هدخلو 
        count: count, //  ده انا الي هدخلو 
        status: "created"
    };
    // push = array اضافه عنصر الي 
    if(newTask.count > 1){
        for (let i = 0; i < newTask.count; i++) {
             tasks.push(newTask);
    }
     }else{
             tasks.push(newTask);
    }

    // tasks.push(newTask);//*** */
    // saveTasks();
     // localStorage.Tasks  احفظ الـ الموجودة حالياً في  
    // Clear inputs 
    document.getElementById("taskName").value = ""; 
    document.getElementById("taskDescription").value = "";
    document.getElementById("count").value = "";
    // Display tasks
    // displayTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    cleardata()
    showdata()
}
function cleardata() {
     taskName.value = "";
     taskDescription.value = "";
     count.value = "";
}
//READ //
function showdata() {
    //  let tableBody = document.getElementById("taskTableBody");}
     let table ='';
    for (let i = 0; i < tasks.length; i++) {
        table += `<tr>
        <td>${tasks[i].name}</td>
        <td>${tasks[i].description}</td>
        <td>${tasks[i].status}</td>
        <td>${tasks[i].count}</td>
        <td><div class="filter-buttons">
            <!-- 1 -->
            <button class="btn btn-info" onclick="filterTasks('all')">All </button> <!-- 1 -->
            <button class="btn btn-success" onclick="filterTasks('done')">Done</button>  <!-- 2 -->
            <button class="btn btn-secondary" onclick="updateTask()">Created</button>  <!-- 3 -->
            <button class="btn btn-danger" onclick="deleteTask(${i})">delete</button>  <!-- 3 -->
        </div>
        </tr>`;    
    }
//    let tableBod ='',
 document.querySelector("#taskTableBody").innerHTML =table;
}
showdata()  // يفضل لما اعمل ريفريش للصفحه يفضل يعرض البيانات الي موجوده في اللستوريج

// delete //

function deleteTask(i){
    tasks.splice(i, 1); // delete 1 element from index i
    localStorage.setItem("tasks", JSON.stringify(tasks)); // update localStorage
    showdata(); // refresh the displayed data // علشان لما احذف عنصر من الجدول يتحدث الجدول ويظهرلي العناصر المتبقيه
}
//update //
// function creatdata(i){
//      taskName.value = tasks[i].name;
//      taskDescription.value = tasks[i].description;
//      count.value = tasks[i].count;
// }

function updateTask() {
    let id =  Number( document.querySelector("#editTaskId").value
        );
    let name = document.querySelector("#editTaskName").value;
    let description = document.querySelector("#editTaskDescription").value;
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
    let modalElement = document.querySelector("#editModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}