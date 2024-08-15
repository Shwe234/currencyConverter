const Base_url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rZBlg3Neykyt0XlGOzyjLtgPpOayYBob1BvsqZVC"
;
const dropSelects = document.querySelectorAll(".dropdown select"); // Use querySelectorAll to get all select elements

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const ToCurr=document.querySelector(".to select");

// Looping over select options and converting country list currency code into options
for (let select of dropSelects) { // Correctly loop over the NodeList
    for (let currCode in countryList) { // Accessing each currency code in countryList
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        // Setting default selected options
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; 
        } else if (select.name === "to" && currCode === "INR") { 
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode]; 
    if (!countryCode) {
        console.error(`No country code found for currency code: ${currCode}`);
        return;
    }

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) { 
        img.src = newSrc;
        img.alt = `${countryCode} flag`;
    } else {
        console.error("Image element not found.");
    }
};

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();//all work is to be done by us 
    let amt=document.querySelector("form input");
    let amtVal=amt.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    const url='fca_live_rZBlg3Neykyt0XlGOzyjLtgPpOayYBob1BvsqZVC';
    // ${Base_url}/${fromCurr.value}/${ToCurr.value}.json
    let response=await fetch(url);
    let data =await response.json();
    console.log(data);
})

