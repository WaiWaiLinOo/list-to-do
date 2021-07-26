// ui 
const form = document.querySelector('#task-form');
const taskinput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
// Add tasks event listener
form.addEventListener('submit',addtask);
// Remove task Event Listener 
tasklist.addEventListener('click',removetask);
// clear tasks event listener 
clearbtn.addEventListener('click',cleartasks);
// filter task event listener 
filter.addEventListener('keyup',filtertasks);
// for localStorage show 
// DOM load event listener //to load from storage // to show UI
document.addEventListener('DOMContentLoaded',gettasks);
// clear Tasks event listener 
clearbtn.addEventListener('click',cleartasksfromlocalstorage);

function addtask(e){
    // console.log('hello');
    if(taskinput.value == ''){
        window.alert("Add a task");
    }else{
        const li = document.createElement('li');
    }
    // create li element 
    const li = document.createElement('li');
    // add class 
    li.className = "collection-item";
    // create text node and append to ul
    li.appendChild(document.createTextNode(taskinput.value));
    const link = document.createElement('a');
    
    // add class 
    link.className="delete-item secondary-content";
    //add icon
    // link.innerHTML = `<i class="far fa-trash-alt"></i>`;
    link.innerHTML = "Delete";
  
    // append link to li 
    li.appendChild(link);
    // append li to ul 
    tasklist.appendChild(li);
    // Store in localStorage 
    storetaskinlocalstorage(taskinput.value);

    e.preventDefault();
}
// removetask 
function removetask(e){
    // console.log(e.target);
    // console.log(e.target.classList);
    // console.log(e.target.classList.contains);
    // console.log(e.target.parentElement);
    //  if(e.target.parentElement.classList.contains('delete-item')){
    //      e.target.parentElement.parentElement.remove();
    //  }
    if(e.target.classList.contains('delete-item')){
        if(confirm("Are Your Sure")){
            e.target.parentElement.remove();
        }
    }
    // remove task from localStorage 
    removetaskfromlocalstorage(e.target.parentElement);
}
// cleartasks 
function cleartasks(){
    // console.log('hey');
    // Method 1
    // tasklist.innerHTML = '';

//     Method 2 
//     console.log(tasklist.childElementCount);
//     console.log(tasklist.firstChild);
    let x = 0;
   while(x<tasklist.childElementCount){
        tasklist.removeChild(tasklist.firstChild);
    }


}
// filter tasks 
function filtertasks(e){
    // console.log('hay');
    // console.log(e.target.value);
    const filter = e.target.value.toLowerCase();
    // console.log(filter);
    const tasks = document.querySelectorAll('.collection-item');
    // task is equal to "e" as array 
   tasks.forEach(function(task){
       console.log('task is'+task);
       console.log('tasks'+tasks);
       console.log('task.firstchild is'+task.firstChild);
       console.log('task.firstchild.textContent is'+task.firstChild.textContent);
       const item = task.firstChild.textContent.toLowerCase();
       if(item.indexOf(filter)!== -1){
           task.style.display = 'block';
       }else{
           task.style.display = 'none';
       }
   });
}
// Store task 
function storetaskinlocalstorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // only show UI 
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Get tasks from localStorage 
function gettasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        task = [];
     }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element 
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element 
        const link = document.createElement('a');
        // add class 
        link.className = 'delete-item secondary-content';
        // add icon 
        // link.innerHTML=`<i class="far fa-trash-alert"></i>`;
         link.innerHTML = "Delete";
        // append link to li 
        li.appendChild(link);
        // append li to ul 
        tasklist.appendChild(li);
    });
}
// finish one 
// gettasks();

// Remove task form localstorge 
function removetaskfromlocalstorage(taskitem){
    console.log('taskitem'+taskitem);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        // text to object 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        // console.log(task);
        // // console.log(index);
        // console.log(tasks);
        // console.log('taskitem'+taskitem);
        // console.log('taskitem.firstchild'+taskitem.firstChild);
        // console.log('taskitem.firstchild.textcontent'+taskitem.firstChild.textContent);
        // console.log('task '+task);

        if(taskitem.firstChild.textContent === task){
            // console.log('hey');
            //  console.log(taskitem);
            // where we want to stat(index),where we want to go end(how many) 
            tasks.splice(index,1);
        }else{
            console.log('not equal');
            //  tasks.splice(index,1);
            console.log('complete');
        }
    });
    //objects to strings
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear from localStorage 
function cleartasksfromlocalstorage(){
    localStorage.clear();
}


