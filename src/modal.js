import {displayQuests} from './display'
import{sideQuestModule} from './sidequest'


//*LS* this is the code to build the local storage
//*LS* below calls the taskarray storage or if empty an empty array
let quests = JSON.parse(localStorage.getItem("taskarray") || "[]");

//*SQ* this is the code to build the side quest implementation
//*SQ* below is the array for the side quests
//*SLQ* local storage for sidequests
let sidequests = JSON.parse(localStorage.getItem("sidequesttaskarray") || "[]");

const modalModule = (() => {
    //opens the modal
    const showModule = (t) =>{
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.querySelector(".btns").style.display = "block";
    document.querySelector(".hiddenbtns").style.display = "none";
    let task = document.getElementById("taskName");
    task.textContent = t.target.dataset.taskName;
    let describe = document.getElementById("taskDescription")
    describe.textContent = t.target.dataset.description;
    let deadline = document.getElementById("taskDeadline");
    deadline.textContent = t.target.dataset.deadline;
    //accessing the edit button
    let editbtn = document.getElementById("editbtn");
    editbtn.dataset.taskName = t.target.dataset.taskName;
    editbtn.dataset.description = t.target.dataset.description;
    editbtn.dataset.deadline = t.target.dataset.deadline;
    editbtn.dataset.array = t.target.dataset.array;
    editbtn.dataset.taskno = t.target.dataset.taskno;
    editbtn.dataset.projectno = t.target.dataset.projectno;
    editbtn.addEventListener('click',modalModule.editModule);
    //accessing the delete task button
    let dltbtn = document.getElementById("dltbtn");
    dltbtn.dataset.taskName = t.target.dataset.taskName;
    dltbtn.dataset.array = t.target.dataset.array;
    dltbtn.dataset.taskno = t.target.dataset.taskno;
    dltbtn.dataset.projectno = t.target.dataset.projectno;
    dltbtn.dataset.projectnumber = t.target.dataset.projectno;
    dltbtn.addEventListener('click',modalModule.rmvtask);
    //accessing undo task button
    let undobtn = document.getElementById("undobtn");
    undobtn.dataset.taskName = t.target.dataset.taskName;
    undobtn.dataset.array = t.target.dataset.array;
    undobtn.dataset.taskno = t.target.dataset.taskno;
    undobtn.dataset.projectno = t.target.dataset.projectno;
    undobtn.dataset.projectnumber = t.target.dataset.projectno;
    if(t.target.dataset.doneatt === "true"){
      undobtn.style.display = "inline";
    }
    else{undobtn.style.display = "none";}
    undobtn.addEventListener('click', undo);
  
    
  }
  //closes module
  const closeModule = () =>{
     let modal = document.getElementById("myModal");
     modal.style.display = "none";
  }
  
  //removes task
  const rmvtask = (t) => {
    let tt = t.target.dataset.taskno;
    if(t.target.dataset.array === "1"){
    quests.splice(tt,1);
    localStorage.setItem("taskarray", JSON.stringify(quests));
  modalModule.closeModule();
  displayQuests.display();}
  else{
    let pn = t.target.dataset.projectno;
      sidequests[pn].tasks.splice(tt,1);
    localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.display(t);
  modalModule.closeModule();
  }
  
  }
  
  //puts completed task back into active tasks
  const undo = (t) => {
    let tt = t.target.dataset.taskno;
    if(t.target.dataset.array === "1"){
    quests[tt].done = false;
      localStorage.setItem("taskarray", JSON.stringify(quests));
  modalModule.closeModule();
  displayQuests.display();}
  else{
    let pn = t.target.dataset.projectno;
      sidequests[pn].tasks[tt].done = false;
    localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.display(t);
  modalModule.closeModule();
  }
  
  
  }
  
  //edits the task
  const editModule = (t) =>{
    //change name
    let inputtn = document.createElement("input");
    document.getElementById("taskName").textContent = "";
    inputtn.placeholder =t.target.dataset.taskName
    inputtn.setAttribute("id","changeName");
    document.getElementById("taskName").appendChild(inputtn);
   
    //change task description
    let inputtd = document.createElement("textarea");
    document.getElementById("taskDescription").textContent = "";
    inputtd.placeholder = t.target.dataset.description;
    inputtd.setAttribute("id","changeDescription");
    document.getElementById("taskDescription").appendChild(inputtd);
  
     //set deadline
    let inputtddead = document.createElement("input");
    document.getElementById("taskDeadline").textContent = "";
    inputtddead.placeholder = t.target.dataset.deadline;
    inputtddead.type = "date";
    //inputtddead.value = 
    inputtddead.setAttribute("id","changeDeadline");
    document.getElementById("taskDeadline").appendChild(inputtddead);
  
    //hide edit and delete buttons show save and cancel
    document.querySelector(".btns").style.display = "none";
    document.querySelector(".hiddenbtns").style.display = "block";
  
    let saveBtn = document.getElementById("savebtn");
    saveBtn.dataset.taskno = t.target.dataset.taskno;
    saveBtn.dataset.projectno = t.target.dataset.projectno;
    saveBtn.dataset.projectnumber = t.target.dataset.projectno;
    saveBtn.dataset.deadline = t.target.dataset.deadline;
    saveBtn.dataset.array = t.target.dataset.array;
    let cnclBtn = document.getElementById("cancelbtn");
    saveBtn.addEventListener('click',modalModule.saveEdit)
    cnclBtn.addEventListener('click', modalModule.closeModule)
  
    
  
  }
  
  const saveEdit = (t) => {
  console.log(t.target.dataset.array);
  console.log(t.target.dataset.deadline);
  
  if(t.target.dataset.array === "1"){
  let tt = t.target.dataset.taskno;
  //change name
  let chanName = document.getElementById("changeName");
  if(chanName.value === ""){chanName.value = quests[tt].title}
  quests[tt].title = chanName.value;
  //set or change description
  let chanDes = document.getElementById("changeDescription");
  if(chanDes.value === ""){chanDes.value = quests[tt].description}
  quests[tt].description = chanDes.value;
  //set or change deadline
  let chanDead = document.getElementById("changeDeadline");
  if(chanDead.value === ""){chanDead.value = quests[tt].deadline}
  quests[tt].deadline = chanDead.value;
  //store it to local storage
  localStorage.setItem("taskarray", JSON.stringify(quests));
  modalModule.closeModule();
  displayQuests.display();
  }
  else{
  let tt = t.target.dataset.taskno;
  let pn = t.target.dataset.projectno;
  //title
  let chanName = document.getElementById("changeName");
  if(chanName.value === ""){chanName.value = sidequests[pn].tasks[tt].title}
  sidequests[pn].tasks[tt].title = chanName.value;
  //description
  let chanDes = document.getElementById("changeDescription");
  if(chanDes.value === ""){chanDes.value = sidequests[pn].tasks[tt].description}
  sidequests[pn].tasks[tt].description = chanDes.value;
  //deadline
  let chanDead = document.getElementById("changeDeadline");
  if(chanDead.value === ""){chanDead.value = sidequests[pn].tasks[tt].deadline}
  sidequests[pn].tasks[tt].deadline = chanDead.value;
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.display(t);
  modalModule.closeModule();
  }
  
  }
  
  return {showModule,closeModule,editModule,saveEdit,rmvtask,undo}
  })();

  export{modalModule};