
const actdiv = document.querySelector(".activeQuestContent")
const compldiv = document.querySelector(".completeQuestContent")
let quests = [{title:"Wash Hair",done:false},
                {title:"Brush Teeth",done:false}
                                ];   
//factory function that  creates quests
function quest(title,done){
    this.title = title
    this.done = done
  }

//a function that loops through the quests placing them in active or done
const displayQuests =(()=> {

const display = () => {
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

const check = (t) => {
  let tt = t.target.value;
  quests[tt].done = true;
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
  displayQuests.display();
  localstore.storearray();

}

//storing quests array into local storage
const localstore = (() =>{

const storearray = ()=>{
for(i=0;i<quests.length;i++){
  localStorage.setItem('Questtitle'+ i,quests[i].title);
}
}

const printarray = () => {
  for(i=0;i<quests.length;i++){
    console.log(localStorage.getItem('Questtitle'+ i));
  }
}

const setarray = () =>{
  for(i=0;i<quests.length;i++){
    let quests = [{title: localStorage.getItem('Questtitle'+ i),done:false}];
   };
  

}

return{storearray,printarray,setarray}
})();
localstore.setarray();





//testing code to see how local storage works
document.getElementById("colorch").addEventListener('click',()=>{change()})
function change(){
let bgc =  document.getElementById("color").value;
document.body.style.backgroundColor = bgc;
localStorage.setItem('backgroundcolor',bgc)}

let loccol = localStorage.getItem('backgroundcolor');
document.body.style.backgroundColor = loccol;