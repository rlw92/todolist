
const actdiv = document.querySelector(".activeQuestContent")
const compldiv = document.querySelector(".completeQuestContent")

//*SQ* below is accessing the dropdown content
const sidediv = document.querySelector("#dropcont")

//access the add quest button
let add = document.getElementById("add");

//access the clear button
let clearbutton = document.getElementById("clearb");

//access clearcomp button
let clearcomp = document.getElementById("clearcomp");

//accessing the remove side quest button
let rmvsq = document.getElementById("removeSQ");

//*LS* this is the code to build the local storage
//*LS* below calls the taskarray storage or if empty an empty array
let quests = JSON.parse(localStorage.getItem("taskarray") || "[]");

//*SQ* this is the code to build the side quest implementation
//*SQ* below is the array for the side quests
//*SLQ* local storage for sidequests
let sidequests = JSON.parse(localStorage.getItem("sidequesttaskarray") || "[]");

//factory function that  creates quests
function quest(title,done,description,deadline){
    this.title = title
    this.done = done
    this.description = description
    this.deadline = deadline
  }

//factory function that creates sidequests
function sidequestfactory(name,tasks){
  this.name = name
  this.tasks = tasks
  
}

//Below is accessing the modal that shows the information of each task
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
  console.log(t.target.dataset.array);
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

//a function that loops through the main quests placing them in active or done
const displayQuests =(()=> {

const display = () => {  
  add.addEventListener('click',displayQuests.addQuests)
  clearbutton.addEventListener('click',displayQuests.cleararray)
  clearcomp.addEventListener('click',displayQuests.clearcompl)
  document.querySelector("#header").textContent = "Main Quest"
  rmvsq.style.display = "none";
    actdiv.textContent= "";
  compldiv.textContent="";
  for(i=0;i<quests.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = quests[i].title;
   label.setAttribute("id","label"+i)
   
   //adding modal functionality below
   label.dataset.taskName = quests[i].title;
   label.dataset.description = quests[i].description;
   label.dataset.doneatt = quests[i].done;
   label.dataset.deadline = quests[i].deadline;
   label.dataset.array = 1;
   label.dataset.taskno = i;
   

   
   label.addEventListener('mouseover',()=>{label.style = "border-bottom:2px solid black;cursor:pointer"});
   label.addEventListener('mouseleave',()=>{label.style = "border-bottom:none"});
   label.addEventListener('click', modalModule.showModule);

   div.appendChild(label);
      
  if(quests[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("span");
   button.addEventListener('mouseover',()=>{button.style = "color:green;cursor:pointer;"});
   button.addEventListener('mouseleave',()=>{button.style = "color:black;"});
   button.addEventListener('click',displayQuests.check);
   button.textContent = "Done";
   button.value = i;
   input.appendChild(button);
   div.appendChild(input);
   actdiv.appendChild(div)}
   else if(quests[i].done===true){compldiv.appendChild(div);}
  }
}

//changes task to done and updates local storage
const check = (t) => {
  let tt = t.target.value;
  quests[tt].done = true;
  localStorage.setItem("taskarray", JSON.stringify(quests));
  t.target.style.backgroundColor = "green";
  displayQuests.display();
}

//adding quests into  array using factory function
const addQuests = () =>{
  let c = prompt("Enter your quest young knight!");
  let title = c;
  let done = false;
  let description = "";
  let deadline = "";
  let q = new quest(title,done,description,deadline);
  quests.push(q);
  localStorage.setItem("taskarray", JSON.stringify(quests));
  displayQuests.display();
  
}


//clears the tasks without using the dreaded local storage clear
function cleararray(){
  actdiv.textContent= "";
  compldiv.textContent="";
  quests = [];
  localStorage.setItem("taskarray", JSON.stringify(quests));
}

function clearcompl(){
  let donearr = [];
  for(i=0;i<quests.length;i++){
    if(quests[i].done === true){
      donearr.push(i)
    }
  }
  console.log(donearr);
  for (i = donearr.length -1; i >= 0; i--)
   quests.splice(donearr[i],1)
  alert("Function under construction, sorry for the iconvenience")
console.log("Work In Progress")
localStorage.setItem("taskarray", JSON.stringify(quests));
displayQuests.display();
}


  return{display,check,addQuests,cleararray,clearcompl}

})();
  displayQuests.display();

  






//*SQ below is the module for all the sidequest content, same functions as above applied to the side quests
const sideQuestModule =(() => {

//below code is to process sidequests in the dropdown list
const dropdownside = () =>{
  for(i=0;i<sidequests.length;i++){
    let a = document.createElement("a");
    a.textContent = sidequests[i].name;
    a.dataset.projectnumber = i;
    a.addEventListener('click',sideQuestModule.display);
    sidediv.appendChild(a);
    
  }
  let aa = document.createElement("a");
  aa.textContent = "Add Side Quest";
  aa.style = "background-color:yellow";
  aa.addEventListener('mouseover',()=>{aa.style = "background-color:green;cursor:pointer;"});
  aa.addEventListener('mouseleave',()=>{aa.style.backgroundColor = "yellow"});
  aa.addEventListener('click',sideQuestModule.addproject);
  sidediv.appendChild(aa);
}

  //generate sidequest content
const display = (t) => {
  let tt = t.target.dataset.projectnumber;

  rmvsq.style.display = "inline";
  rmvsq.dataset.projectnumber = tt;
  rmvsq.addEventListener('click',sideQuestModule.deleteSQ)
  
  add.dataset.projectnumber = tt;
  add.removeEventListener('click',displayQuests.addQuests);
  add.addEventListener('click',sideQuestModule.addQuests);

  clearbutton.dataset.projectnumber = tt;
  clearbutton.removeEventListener('click',displayQuests.cleararray);
  clearbutton.addEventListener('click', sideQuestModule.cleararray);

  clearcomp.dataset.projectnumber = tt;
  clearcomp.removeEventListener('click',displayQuests.clearcompl);
  clearcomp.addEventListener('click',sideQuestModule.clearcompl);



  
  document.querySelector("#header").textContent = sidequests[tt].name;
  //Below i am tryin to process the list for each of the tasks of the specific side project
  actdiv.textContent= "";
  compldiv.textContent="";

  for(i=0;i<sidequests[tt].tasks.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = sidequests[tt].tasks[i].title;
   label.setAttribute("id","label"+i)

   //adding modal functionality below
   label.dataset.taskName = sidequests[tt].tasks[i].title;
   label.dataset.description = sidequests[tt].tasks[i].description;
   label.dataset.projectno = tt;
   label.dataset.deadline = sidequests[tt].tasks[i].deadline;
   label.dataset.taskno = i;
   label.dataset.doneatt = sidequests[tt].tasks[i].done;
   label.addEventListener('mouseover',()=>{label.style = "border-bottom:2px solid black;cursor:pointer"});
   label.addEventListener('mouseleave',()=>{label.style = "border-bottom:none"});
   label.addEventListener('click', modalModule.showModule);

   div.appendChild(label);
      
  if(sidequests[tt].tasks[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("span");
   button.textContent = "Done";
   button.value = i;
   button.dataset.projectnumber = tt;
   button.addEventListener('mouseover',()=>{button.style = "color:green;cursor:pointer;"});
   button.addEventListener('mouseleave',()=>{button.style = "color:black;"});
   button.addEventListener('click',sideQuestModule.check);
   
   input.appendChild(button);
   div.appendChild(input);
   actdiv.appendChild(div)}
   else if(sidequests[tt].tasks[i].done === true){compldiv.appendChild(div);}

  
  }
}

//Deletes sidequest from array and takes you back to the main quest menu
const deleteSQ = (t) => {
  let tt = t.target.dataset.projectnumber
  sidequests.splice(tt,1);
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  displayQuests.display();
  sidediv.textContent = "";
  sideQuestModule.dropdownside();

}

//changes side task to done and updates local storage
const check = (t) => {
  let tt = t.target.dataset.projectnumber;
  console.log(tt);
  let pp = t.target.value
  console.log(pp)
  sidequests[tt].tasks[pp].done = true;
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  t.target.style.backgroundColor = "green";
  sideQuestModule.display(t);
  
}

//adding sidequests to sidequests
const addproject  = () =>{
  let c = prompt("Enter the name of your side quest");
  let name = c;
  let tasks = [];
  let q = new sidequestfactory(name,tasks);
  sidequests.push(q);
    for (i=0;i<sidequests.length;i++){sidediv.removeChild(sidediv.firstElementChild);}
    localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.dropdownside();

}

//adding quests into  array using factory function
const addQuests = (t) =>{
  let c = prompt("Enter your quest young knight!");
  let title = c;
  let description = "";
  let done = false;
  let deadline = "";
  let tt = t.target.dataset.projectnumber;
  console.log(tt);
  let q = new quest(title,done,description,deadline);

  sidequests[tt].tasks.push(q);
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
  sideQuestModule.display(t);
  
}

//clears the tasks without using the dreaded local storage clear
function cleararray(t){
  let tt = t.target.dataset.projectnumber;
  actdiv.textContent= "";
  compldiv.textContent="";
  sidequests[tt].tasks = [];
  localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
}

function clearcompl(t){
  let tt = t.target.dataset.projectnumber;
  let donearr = [];
  for(i=0;i<sidequests[tt].tasks.length;i++){
    if(sidequests[tt].tasks[i].done === true){
      donearr.push(i)
    }
  }
  console.log(donearr);
  for (i = donearr.length -1; i >= 0; i--)
   sidequests[tt].tasks.splice(donearr[i],1)
  alert("Function under construction, sorry for the iconvenience")
console.log("Work In Progress")
localStorage.setItem("sidequesttaskarray", JSON.stringify(sidequests));
sideQuestModule.display(t);
}



  return{dropdownside,display,check,addQuests,cleararray,addproject,deleteSQ,clearcompl}

})();
sideQuestModule.dropdownside();


//Below is accessing the main quest button
document.getElementById("mainb").addEventListener('click',()=>{
  add.removeEventListener('click',sideQuestModule.addQuests);
   displayQuests.display()})
