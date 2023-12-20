var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var list = [];




if(localStorage.getItem("list") != null ){
    list = JSON.parse(localStorage.getItem("list"));
    display();
}




function submit(){
    if(isValidName() && isValidUrl()){
        var element = {
            name:siteName.value,
            url:siteUrl.value
        }
        list.push(element);
        display();
        setStorage(list);
        clearForm();
        document.getElementById("nameState").innerHTML = " ";
        document.getElementById("urlState").innerHTML = " "
        document.querySelector(".valid-name").style = "border-color:#ced4da;";
        document.querySelector(".valid-url").style = "border-color:#ced4da;";

    }

else{
    document.getElementById("message").classList.add("show");
    document.getElementById("overlay").style.display = "block";
}
}








function off(){
    document.getElementById("overlay").style.display = "none";
    hide();
}



function display(){

   var temp = "";
   for(var i = 0 ;i< list.length;i++){
    
    temp = temp + `<tr>
    <td>`+ (i+1) +`</td>
    <td>`+list[i].name +`</td>
    <td><button onclick="openWindow(`+i+`)" type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button type="button" onclick="deleteItem(`+i+`)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
   }

    document.getElementById("tableContent").innerHTML = temp;
}




function clearForm(){
    siteName.value = "";
    siteName.placeholder = "Bookmark Name";
    siteUrl .value = "";
    siteUrl.placeholder = "Website URL";
}





function setStorage(item){
    localStorage.setItem("list",JSON.stringify(item));
}





function deleteItem(index){
    list.splice(index,1);
    display();
    setStorage(list);
}




function deleteAll(){
    list=[];
    display();
    setStorage(list);
}




function openWindow(index){
    window.open(list[index].url,"_blank");
}





function search (){
    var searchValue = document.getElementById("search").value.toLowerCase();
    var temp = "";
    for(var i = 0 ;i< list.length;i++){
    if((list[i].name.toLowerCase()).includes(searchValue)){
    temp = temp + `<tr>
    <td>`+ (i+1) +`</td>
    <td>`+(list[i].name.toLowerCase()).replace(searchValue,"<span class='bg-warning'>"+searchValue+"</span>")+ `</td>
    <td><button onclick="openWindow(`+i+`)" type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button type="button" onclick="deleteItem(`+i+`)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }
}
    document.getElementById("tableContent").innerHTML = temp;
}




function isValidName(){
    var name = siteName.value.trim();
    if(name.match(/^[A-Za-z]{3,20}$/i)){
        document.getElementById("nameState").innerHTML = '<i class="fa-solid fa-circle-check" style="color:green;"></i>';
        document.querySelector(".valid-name").style = "border-color:green;box-shadow: 0 0 0 0.25rem rgba(25,135,84,.25);";
        return true;
    }
    else {
        
        document.getElementById("nameState").innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:red;"></i>';
        document.querySelector(".valid-name").style = "border-color:red;    box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);";
        return false;
    }
}




function isValidUrl(){
    var url = siteUrl.value.trim();
    if(url.match( /^(ftp|https?):\/\/+(www\.)[a-z0-9\-\.]{3,}\.[a-z]{3}$/)){
        document.getElementById("urlState").innerHTML = '<i class="fa-solid fa-circle-check" style="color:green;"></i>';
        document.querySelector(".valid-url").style = "border-color:green;box-shadow: 0 0 0 0.25rem rgba(25,135,84,.25);";
        return true;
    }
    else{
        document.getElementById("urlState").innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:red;"></i>';
        document.querySelector(".valid-url").style = "border-color:red;    box-shadow: 0 0 0 0.25rem rgba(220,53,69,.25);";
        return false;
    }
}

function hide(){
    document.getElementById("message").classList.remove("show");
    off();
}

