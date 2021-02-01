function checkKeyUpForm(event){
    if (event.keyCode === 13){
        addNewContact();
    }
}

function addNewContact(){
    try{
        var name = getFormElement("name", "Contact Name");
        validateName(name);
        var mobile = getFormElement("mobile", "Mobile Number");
        validateMobile(mobile);
        var email = getFormElement("email", "Email");
        validateEmail(email);
    }catch(e){
        alert(e);
        return;
    }
    
    contact = {name, mobile, email};
    contactsList.push(contact)
    refreshTable(contactsList);
    
    clearField("name");
    clearField("mobile");
    clearField("email");
    setFocus("name");
}

function validateName(name){
    var regex = /^[a-zA-Z ]{2,30}$/;
    if(!regex.test(name)){
        throw new Error("Nome inválido.")
    }
}

function validateMobile(mobile){
    var regex = /^\(?([ 0-9]{3})\)?[-. ]?([ 0-9]{3})[-. ]?([ 0-9]{4})$/;
    if(!regex.test(mobile)){
        throw new Error("Mobile number is invalid.");
    }
}

function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(email)){
        throw new Error("Email com formato inválido");
    }
}

function clearField(elementId){
    document.getElementById(elementId).value = "";
}

function setFocus(elementId){
    document.getElementById(elementId).focus();
}

function getFormElement(elementId, fieldName){
    var value = null;
    if(document.getElementById(elementId) == null){
        throw new Error("Preencha o campo " + fieldName);
    }
    value = document.getElementById(elementId).value;
    if(value == null || value.trim() == ""){
        throw new Error("Preencha o campo " + fieldName);
    } 
    return value;
}

function refreshTable(data){
    if(data.length == 0){
        document.getElementById("contactSummary").innerHTML = "<div id=\"noResult\" class=\"noResult dn\">No Results Found</div>"; 
        document.getElementById("noResult").style.display = "block";
        return;
    }

    html = "<table id=\"summaryTable\">"
    html += "<thead><tr>"
    html += "<th id=\"nameColumn\" onClick=\"sortTable(0)\">Name</th>"
    html += "<th id=\"mobileColumn\" onClick=\"sortTable(1)\">Mobile</th>"
    html += "<th id=\"emailColumn\" onClick=\"sortTable(2)\" >Email</th>"
    html += "</tr></thead>"
    for (var i=0; i<data.length; i++) {
        html += "<tbody><tr>";
        html += `<td>${data[i].name}</td>`;
        html += `<td>${data[i].mobile}</td>`;
        html += `<td>${data[i].email}</td>`;
        html += "</tbody></tr>";
    }
    html += "</table>";

    document.getElementById("contactSummary").innerHTML = html;
}

function sortTable(index){
    if(index == 0){//by name
        refreshTable(contactsList.sort((c1, c2) => {
            let comparison = 0;
            if(c1.name.toUpperCase() > c2.name.toUpperCase()){
                comparison = 1;
            }else if(c1.name.toUpperCase() < c2.name.toUpperCase()){
                comparison = -1;
            }
            return comparison; 
        }))        
    }else if(index == 1){//by mobile
        refreshTable(contactsList.sort((c1, c2) => {
            let comparison = 0;
            if(c1.mobile > c2.mobile){
                comparison = 1;
            }else if(c1.mobile < c2.mobile){
                comparison = -1;
            }
            return comparison; 
        }))
    }else if(index == 2){//by email
        refreshTable(contactsList.sort((c1, c2) => {
            let comparison = 0;
            if(c1.email.toUpperCase() > c2.email.toUpperCase()){
                comparison = 1;
            }else if(c1.email.toUpperCase() < c2.email.toUpperCase()){
                comparison = -1;
            }
            return comparison; 
        }))
    }
}

function searchContact(){
    var value = null;
    if(document.getElementById("search") == null){
        refreshTable(contactsList);
    }
    value = document.getElementById("search").value;
    if(value == null || value.trim() == ""){
        refreshTable(contactsList);
    } 
    copyOfContactList = [...contactsList]
    refreshTable(
        copyOfContactList.filter(
            (contact) => {
                return contact.mobile.indexOf(value) > -1;
            }
        )
    )
}