
const actdiv = document.querySelector(".activeQuestContent")
const compldiv = document.querySelector(".completeQuestContent")

//*SQ* below is accessing the dropdown content
const sidediv = document.querySelector("#dropcont")

//*LS* this is the code to build the local storage
//*LS* below calls the taskarray storage or if empty an empty array
let quests = JSON.parse(localStorage.getItem("taskarray") || "[]");

//*SQ* this is the code to build the side quest implementation
//*SQ* below is the array for the side quests
let sidequests = [{name:"Guitar",tasks:[{name:'Learn Hotel California',done:false},{name:'Learn riff2',done:false}]},
                  {name:"Piano",tasks:[{name:'Learn Still dre',done:false},{name:"Learn fur elise",done:true}]}
];

//factory function that  creates quests
function quest(title,done){
    this.title = title
    this.done = done
  }

//a function that loops through the quests placing them in active or done
const displayQuests =(()=> {

const display = () => {
  document.querySelector("#header").textContent = "Main Quest"
    actdiv.textContent= "";
  compldiv.textContent="";
  for(i=0;i<quests.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = quests[i].title;
   label.setAttribute("id","label"+i)
   div.appendChild(label);
      
  if(quests[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("button");
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


  return{display,check}

})();
  displayQuests.display();

  
//adding quests into  array using factory function
const addQuests = () =>{
  let c = prompt("Enter your quest young knight!");
  let title = c;
  let done = false;
  let q = new quest(title,done);
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





//*SQ below is the module for all the sidequest content
const sideQuestModule =(() => {

//below code is to process sidequests in the dropdown list
const dropdownside = () =>{
  for(i=0;i<sidequests.length;i++){
    let a = document.createElement("a");
    a.textContent = sidequests[i].name;
    a.dataset.projectnumber = i;
    a.addEventListener('click',sideQuestModule.display);
    sidediv.appendChild(a);
  }}

  //generate sidequest content
const display = (t) => {
  let tt = t.target.dataset.projectnumber;
  document.querySelector("#header").textContent = sidequests[tt].name;
  //Below i am tryin to process the list for each of the tasks of the specific side project
  actdiv.textContent= "";
  compldiv.textContent="";
  for(i=0;i<sidequests[tt].tasks.length;i++){
   let div = document.createElement("div");

   let label = document.createElement("label")
   label.textContent = sidequests[tt].tasks[i].name;
   label.setAttribute("id","label"+i)
   div.appendChild(label);
      
  if(sidequests[tt].tasks[i].done === false){
   let input = document.createElement("div");
   let button = document.createElement("button");
   button.textContent = "Done";
   button.value = i;
   button.dataset.projectnumber = tt;
   button.addEventListener('click',sideQuestModule.check);
   
   input.appendChild(button);
   div.appendChild(input);
   actdiv.appendChild(div)}
   else if(sidequests[tt].tasks[i].done === true){compldiv.appendChild(div);}
  
  }
}

//changes side task to done and updates local storage
const check = (t) => {
  let tt = t.target.dataset.projectnumber;
  console.log(tt);
  let pp = t.target.value
  console.log(pp)
  sidequests[tt].tasks[pp].done = true;
  //localStorage.setItem("taskarray", JSON.stringify(quests));
  t.target.style.backgroundColor = "green";
  sideQuestModule.display(t);
  
}



  return{dropdownside,display,check}

})();
sideQuestModule.dropdownside();


//Below is accessing the main quest button
document.getElementById("mainb").addEventListener('click',displayQuests.display);