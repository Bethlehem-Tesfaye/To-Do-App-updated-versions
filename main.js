let tasks = [];

let addButton = document.querySelector("button");
let inputValue = document.querySelector("input");
let list = document.querySelector("ul");

let count = document.querySelector(".task-count p");
let progress = document.querySelector(".progress");
let message = document.querySelector(".title p");


const saveTask=()=>{

    localStorage.setItem("task", JSON.stringify(tasks));

}

document.addEventListener("DOMContentLoaded", function(){

    let savedTask = JSON.parse(localStorage.getItem("task"));
    if(savedTask){ 
        savedTask.forEach((task)=>{
            tasks.push(task);
        })
        addToList();
        updatedCount();
    }

})


addButton.addEventListener("click", function(e){

    e.preventDefault();
    addTask();
})

const addTask = ()=>{ 

    if(inputValue.value.trim()){
        tasks.push({text:inputValue.value.trim(), completed:false});
        inputValue.value='';
        console.log(tasks);
        addToList();
        updatedCount();
        saveTask();
    }  
    }
   

const addToList = ()=>{

    list.innerHTML='';

    tasks.forEach((task, index)=>{
        let liList = document.createElement("li");
        liList.innerHTML=
        '<div class="list-container">' +
        '<div class="text ' + (tasks[index].completed ? "completed" : " ") + '">' +
            '<input type="checkbox" ' + (tasks[index].completed ? "checked" : " ") + '>' + 
            '<p>' + task.text + '</p>' +
        '</div>' + 
        '<div class="icons">' +
            '<img src="edit.png" onclick="edit('+index+')">' + 
            '<img src="delete.png" onclick="remove('+index+')">' +
        '</div>' +
    '</div>';

        list.append(liList);
        const checkbox = liList.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            toggleCheckbox(index);
              
        });

    })
}


const toggleCheckbox = (index)=>{

    tasks[index].completed = !tasks[index].completed;
    console.log(tasks[index].completed); 
    addToList();
    updatedCount();
    saveTask();
}

const edit=(index)=>{

    inputValue.value=tasks[index].text;
    tasks.splice(index, 1);
    addToList();
    updatedCount();
    saveTask();
    
}

const remove=(index)=>{ 

    tasks.splice(index, 1);
    addToList();
    updatedCount();
    saveTask();
    
}

const updatedCount = ()=>{

    let totalTask = tasks.length;
    let completedTask = tasks.filter(task => task.completed).length;
    count.innerHTML= completedTask +" / "+totalTask;
    if(totalTask==0&&completedTask==0){
        progress.style.width="0%";
    }
    else{
        progress.style.width=completedTask/totalTask*100+"%";
    }
    

    if(totalTask==completedTask&&totalTask!=0&&completedTask!=0){
        message.innerHTML="You Completed Your Tasks!!"
        confettiEffect();
    }
    else{
        message.innerHTML="Keep it up"
    }

}

const confettiEffect= ()=>{

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
}
