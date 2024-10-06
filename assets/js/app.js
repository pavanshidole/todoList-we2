const cl=console.log;

const todoform=document.getElementById("todoform");
const todoitem=document.getElementById("todoitem");
const todoContainer=document.getElementById("todoContainer");
const info=document.getElementById("info");


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoArr=JSON.parse(localStorage.getItem("todoArr")) || [];

const onMsgData=()=>{
    if(todoArr.length ===0){
        info.classList.remove("d-none");
        todoContainer.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        todoContainer.classList.remove("d-none");
    }
}

onMsgData();

const tempArr=(arr)=>{
    let result=`<ul class="list-group">`;
   arr.forEach(todo => {
       result+=`
              <li class="list-group-item">${todo.todoitem}</li>
       `

       result+=`</ul>`;
      
       todoContainer.innerHTML=result;

       
     
   });
}

if(todoArr.length > 0){
    tempArr(todoArr);
}


const onTodoForm=(ele)=>{
    ele.preventDefault();
    

    let todoObj={
        todoitem:todoitem.value,
        todoId:uuid(),
    }

    todoArr.push(todoObj);
    cl(todoArr);

    ele.target.reset();

    if(todoContainer.querySelector("ul")){
        let li=document.createElement("li");
        li.id=todoObj.todoId;
        li.className=`list-group-item`;
        li.innerHTML=`${todoObj.todoitem}`
        cl(li);
        todoContainer.querySelector("ul").append(li);
    }else{
        tempArr(todoArr);
    }
    

    onMsgData();
    localStorage.setItem("todoArr",JSON.stringify(todoArr));
}


todoform.addEventListener("submit", onTodoForm);

