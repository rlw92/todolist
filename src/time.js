function time(t){
    let color;
    const now = new Date();
    const deadline = new Date(t);
    let nowm = now.getTime()
   let deadm = deadline.getTime()
       if(t === undefined){
       color="green";
     }
   else if(t === ""){
     color = "green";
   }
   else if(deadm - nowm <= 86400000){
     
     color = "red";}
     
     else{
   
   color = "rgb(233, 162, 10)";}
 
     return color;
   }

   export{time};