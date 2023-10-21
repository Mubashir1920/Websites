class Task{
    constructor(name){
        this.name = name;
    }
}


class UI{

    addtask(task){
        const tasklist = document.querySelector('#task-list')
        
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${task.name}</td>
        <td><a href="" class="delete-item">X</a></td>
        `
        tasklist.appendChild(tr);
    }

    showmessage(message , classname){
        const box = document.createElement('div');
        box.className = `${classname}`;

        const text = document.createTextNode(`${message}`)
        box.appendChild(text);


        const container = document.querySelector('.container')
        const form = document.querySelector('#task-form')
        container.insertBefore(box , form);


        setInterval(() => {
            box.remove();
        }, 2000);

    }

    clearfield(){
    document.querySelector('#name').value = '';
    }

    deleteitem(target){

        target.remove()

    }

    clearalltask(){
        const li = document.querySelector('#task-list') ;

        while(li.firstElementChild){
            li.removeChild(li.lastChild) ;
        };
    }
}

class Store{

    static gettasks(){
        let tasks
        if(localStorage.getItem('tasks') === null){

            tasks=[]
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        return tasks;
    }

    static addtask(task){

        const tasks = Store.gettasks();

        tasks.push(task);

        localStorage.setItem('tasks' , JSON.stringify(tasks));


    }
    static displaytask(){
        const tasks = Store.gettasks();

        tasks.forEach(task =>{

            const ui = new UI
            ui.addtask(task);

        })

    }

    static removetask(name){
        const tasks = Store.gettasks();

        tasks.forEach((task,index) =>{
            if(task.name === name ){

                tasks.splice(index , 1);
            }

        });

        localStorage.setItem('tasks' ,JSON.stringify(tasks))

    }

    static cleartask(){

        localStorage.clear()

    }



}



//Event Listeners 
document.addEventListener('DOMContentLoaded' , Store.displaytask)

// TO add Book 
document.querySelector('#task-form').addEventListener('submit' , addtask)   

function addtask(e){

    const name = document.querySelector('#name').value;
    const ui = new UI


    if(name === ''){
        // console.log('error')
        ui.showmessage('Enter Text First !' , 'error')
    }else{

        const task = new Task(name)
        Store.addtask(task);
        ui.addtask(task);
        ui.showmessage('Task Added' , 'success');
        ui.clearfield();

    }  


    e.preventDefault();
}

// To Delete Book 

document.querySelector('#task-list').addEventListener('click' , function(e){

 if(e.target.className === 'delete-item'){
    const ui = new UI

    ui.deleteitem(e.target.parentElement.parentElement);
    Store.removetask(e.target.parentElement.previousElementSibling.textContent)
    
 }


 e.preventDefault();
})

// Clear All

document.querySelector('.clear').addEventListener('click' , function(e){

    const ui =new UI
    ui.clearalltask();

    Store.cleartask()

    e.preventDefault();

})