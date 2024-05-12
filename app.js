const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");

let selectFrom = document.querySelector(".select-from");
let selectTo = document.querySelector(".select-to");


// code to populate the dropdown list
for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code
        newOption.value = code
        if (select.name==="from" && code==="INR"){
            newOption.selected = true;
            select.append(newOption);
        }
        else if (select.name==="to" && code==="USD"){
            newOption.selected = true;
            select.append(newOption);
        }
        else{
        select.append(newOption);
        }
    }
}

// code to populate the dropdown list
//let text = ""
//let textFrom = ""
//let textTo = ""
//for(code in countryList){
//   if(code==='INR'){
//        textFrom +=`<option value=${code} selected>${code}</option>` 
//        textTo +=`<option value=${code}>${code}</option>`   
//    }
//    else if(code==="USD"){
//        textTo +=`<option value=${code} selected>${code}</option>`  
//        textFrom +=`<option value=${code}>${code}</option>`   
//    }
//    else{
//   text +=`<option value=${code}>${code}</option>`
//    }
//}

//selectFrom.innerHTML = text + textFrom
//selectTo.innerHTML = text + textTo


// code to modify the flags on selection
selectFrom.addEventListener("click",()=>{
    let value = selectFrom.value;
    let img = document.querySelector(".img-from")
    img.setAttribute("src",`https://flagsapi.com/${countryList[value]}/flat/64.png`);
});

selectTo.addEventListener("click",()=>{
    let value = selectTo.value;
    let img = document.querySelector(".img-to")
    img.setAttribute("src",`https://flagsapi.com/${countryList[value]}/flat/64.png`);
});


const getRates = async(from,to)=>{
    let url = baseURL+from.toLowerCase()+".json"
    let response = await fetch(url);
    let data = await response.json();
    console.log(data[from.toLowerCase()][to.toLowerCase()]);
    return data[from.toLowerCase()][to.toLowerCase()]
}

let btn = document.querySelector(".rate");

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault(); //prevents occurence of default events like page refresh etc
    let amt = document.querySelector(".amount input");
    if (amt.value===""|| amt.value<1){
        alert("Please enter appropriate value");
    }
    //let selectFrom = document.querySelector(".select-from");
    //let selectTo = document.querySelector(".select-to");
    let msg = document.querySelector(".msg");
    let data = await getRates(selectFrom.value,selectTo.value)
    let amtFloat = parseFloat(amt.value);
    let dataFloat = parseFloat(data);
    console.log(amtFloat,dataFloat)
    let text = `1 ${selectFrom.value} = ${dataFloat} ${selectTo.value} \n`
    msg.innerText =text+ amtFloat*dataFloat ;
})
