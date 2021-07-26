//Ui
const form = document.querySelector('#task-form');
const taskinput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');


form.addEventListener('submit',addtask);
tasklist.addEventListener('click',removetask);
clearbtn.addEventListener('click',cleartasks);
filter.addEventListener('keyup',filtertasks);
document.addEventListener('DOMContentLoaded',gettasks);
clearbtn.addEventListener('click',cleartasksfromlocalstorage);


function addtask(e){
    if(taskinput.value === ''){
        window.alert("Add a task");
    }else{
    const li = document.createElement('li');
    li.className="collection-item";
   li.appendChild(document.createTextNode(taskinput.value));
    const link = document.createElement('a');
    //add class
    link.className="delete-item secondary-content";
    //add icon
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;
    //append link to li
    li.appendChild(link);
    //append li to ul
    tasklist.appendChild(li); 
    //Store in localstorage
    storetaskinlocalstorage(taskinput.value);
    }
    e.preventDefault();
}


function removetask(e){
     if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Are you sure")){
        e.target.parentElement.parentElement.remove();
    } 
}
    removetaskfromlocalstorage(e.target.parentElement.parentElement);

}// only }}end errorone



function cleartasks(){
   
    let x = 0;
   while(x<tasklist.childElementCount){
        tasklist.removeChild(tasklist.firstChild);
    }


}


function filtertasks(e){
    const filter = e.target.value.toLowerCase();
   const tasks = document.querySelectorAll('.collection-item');
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
    




function storetaskinlocalstorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//GET Tasks From Localstorage
function gettasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML=`<i class='far fa-trash-alt'></i>`;
        //append link to li
        li.appendChild(link);

        //append li to ul
        tasklist.appendChild(li);

    });

   //} //errortwo
}


//     //Remove Task From Localstorage
function removetaskfromlocalstorage(taskitem){
        // console.log(taskitem);

        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task,index){
            if(taskitem.textContent === task){
                //where we want to start(index),where we want to end(how many)
                tasks.splice(index,1);
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    


function cleartasksfromlocalstorage(){
    localStorage.clear();
}