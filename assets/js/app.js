const cl=console.log;

const todoform=document.getElementById("todoform");
const todoitemControl=document.getElementById("todoitem");
const todoContainer=document.getElementById("todoContainer");
const info=document.getElementById("info");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");


const snackBar=((title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:4000,
        confirmButtonColor:"#00ff00",
    })
})

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


const onEdit=(ele)=>{
    let editId=ele.closest("li").id;
    localStorage.setItem("editId",editId);
    let editObj=todoArr.find(obj=>obj.todoId===editId);
   
    cl(editObj);

    todoitemControl.value=editObj.todoitem;

    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    
}

onMsgData();

const tempArr=(arr)=>{
    let result=`<ul class="list-group">`;
    result+=arr.map(todo => {
       return`
              <li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
                <span>${todo.todoitem}</span>
                <span">
                    <i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                    <i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                </span>
              </li>
       `

v   }).join("");

       result+=`</ul>`;

       cl(result);
      
       todoContainer.innerHTML=result;

       
     
   
}

if(todoArr.length > 0){
    tempArr(todoArr);
}


const onTodoForm=(ele)=>{
    ele.preventDefault();
    

    let todoObj={
        todoitem:todoitemControl.value,
        todoId:uuid(),
    }

    todoArr.push(todoObj);
    cl(todoArr);

    ele.target.reset();

    if(todoContainer.querySelector("ul")){
        let li=document.createElement("li");
        li.id=todoObj.todoId;
        li.className=`list-group-item d-flex justify-content-between`
        li.innerHTML=`<span>${todoObj.todoitem}</span>
                      <span>
                          <i class="fa-solid  editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i>
                          <i class="fa-solid  removeBtn fa-trash text-danger" onclick="onRemove(this)"></i>
                      </span>`
        
        todoContainer.querySelector("ul").append(li);
        
    }else{
        tempArr(todoArr);
    }
    
    localStorage.setItem("todoArr",JSON.stringify(todoArr));

    snackBar(`this  ${todoObj.todoitem}  todoitem Added is successFully!!`,`success`);

    onMsgData();
    
}


const onUpdateBtn=()=>{
    let updateId=localStorage.getItem("editId");
    let updateObj={
        todoitem:todoitemControl.value,
        todoId:updateId,
    }

    let getIndex=todoArr.findIndex(obj=> obj.todoId===updateId);

    todoArr[getIndex]=updateObj;
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    let list=document.getElementById(updateId).firstElementChild;
    list.innerHTML=`${updateObj.todoitem}`;
    cl(todoArr);

    snackBar(`this  ${updateObj.todoitem}  todoitem update is successFully!!`,`success`);
    AddBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}


todoform.addEventListener("submit", onTodoForm);
updateBtn.addEventListener("click", onUpdateBtn);
