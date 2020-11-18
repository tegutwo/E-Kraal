var textD = "Wear a mask</br> Clean your hands</br> Keep a safe distance";
//Datalist
 function getAvailableCountries(){
     if(localStorage.getItem("Available_countries")){
        addDataList();
     }
     else{
        fetch("https://covid-193.p.rapidapi.com/countries", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8eaecfd9f7msh49d0eb432a90d18p135577jsn1a31d77c491a",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(response => {
    let a =response.json();
    a.then(res=>{
        let countryListData = res.response;
        localStorage.setItem("Available_countries",JSON.stringify(countryListData));
        addDataList();
    });
})
.catch(err => {
	console.error(err);
});
console.log("hey");

     }
    
 }
 function addDataList(){
    let inputContainer = document.querySelector(".input-container");
    const DATALIST = document.createElement("datalist");
    DATALIST.setAttribute("id","countries");
    let optionsArr = JSON.parse(localStorage.getItem("Available_countries"));
    optionsArr.forEach(e => {
        let option = document.createElement("option");
        option.setAttribute("value",e);
        DATALIST.appendChild(option);
    });
    inputContainer.appendChild(DATALIST);
 }
 getAvailableCountries();
//  localStorage.removeItem("Available_countries");


//////////////////////////////////////////////////////////////
function getElement(element){
  
    return document.querySelector(element);
}
//Initialise
function initApp(){
    let stat = document.querySelector("#Statistics");
    stat.classList.add("active");
  
    getData({target:{id:"showAll"}});

}

//Nav;
var history1 = getElement("#History");
    history1.addEventListener("click",()=>{
        let hBtn = document.querySelector("#showAll");
        hBtn.style.display = "none";
        history1.classList.add("active");
        if(Statistics.classList.contains("active")){
            Statistics.classList.remove("active");
        }
       
        getData({target:{id:"show1"}});
    });
let Statistics = getElement("#Statistics")
Statistics.addEventListener("click",()=>{
    let country = document.querySelector("#country");
    country.value = "";
    let hBtn = document.querySelector("#showAll");
        hBtn.style.display = "inline-block";
    Statistics.classList.add("active");
    if(history1.classList.contains("active")){
        history1.classList.remove("active");
    }
    getData({target:{id:"showAll"}});
    let chosenCountry = document.querySelector("#country");
    chosenCountry.innerHTML = "";
    let label = document.querySelector("label[for=country]");
      label.innerHTML = "Show by country";
      label.style.color= "white";
      let appInfo = document.querySelector(".app-info");
      appInfo.innerHTML = "COVID-19 INFORMATION HUB";
});
    //Button
var  show = document.querySelector("#show1");
var showAll = document.querySelector("#showAll");
    show.addEventListener("click",getData);
    showAll.addEventListener("click",getData);

function getData(e){
    showLoading();
    console.log(document.querySelector("div.info-container"));
    if(document.querySelector("div.info-container")!=null){
        let element = document.querySelectorAll("div.info-container");
        element.forEach(e=>{
            e.parentNode.removeChild(e);
        });
        console.log(document.querySelector("div.info-container"));
    }
    //History Tab
    if(history1.classList.contains("active")){
        if(e.target.id ==="show1"){
            //Show 1 Button
            let chosenCountry = document.querySelector("#country").value;
            console.log(chosenCountry);
    if(chosenCountry == null || chosenCountry == ""){
        let label = document.querySelector("label[for=country]");
        label.innerHTML = "Please Choose a country!";
        label.style.color = "yellow";
        endLoading();
    }
    else{
        let label = document.querySelector("label[for=country]");
        label.style.display = "none";
        let header =document.querySelector("h1.app-info");
        header.innerHTML = chosenCountry + " COVID-19 HISTORY";
        chosenCountry = chosenCountry.toLowerCase();

        fetch(`https://covid-193.p.rapidapi.com/history?country=${chosenCountry}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8eaecfd9f7msh49d0eb432a90d18p135577jsn1a31d77c491a",
		"x-rapidapi-host": "covid-193.p.rapidapi.com"
	}
})
.then(response => {
    // endLoading();
    let data = response.json();
    data.then(res=>{
        console.log(res.response);
        let DataArr = res.response;
        console.log(DataArr);
        DataArr.forEach(e=>{
            let main = getElement("main");
            let infoContainer = document.createElement("div");
            infoContainer.classList.add("info-container");
            let infoTag = document.createElement("div");
            infoTag.classList.add("info-tags");
            let infoImageContainer =document.createElement("div");
            infoImageContainer.classList.add("info-image-container");
            let img = document.createElement("img");
            img.setAttribute("src",generateRandomImg(7,1));
            img.setAttribute("alt","Random Mask image");
            img.classList.add("info-image");
            infoImageContainer.appendChild(img);
            let text = document.createElement("p");
            text.classList.add("info-text");
            text.innerHTML = textD;
            infoTag.append(infoImageContainer,text);
            infoContainer.appendChild(infoTag);
            let info = document.createElement("div");
            info.classList.add("info");
            let date = document.createElement("div");
            date.classList.add("date");
            date.innerHTML = "Date: " +e.time.slice(0,10) + " Time: " + e.time.slice(11,16);
            let infoItemsContainer =document.createElement("div");
            infoItemsContainer.classList.add("info-items-container");
            let cases = e.cases;
            for(e in cases){
              
             let infoItem = document.createElement("div");
            infoItem.classList.add("info-item");
            let number = document.createElement("div");
            number.classList.add("number");
            number.innerHTML = cases[e]!=undefined || cases[e] != null || cases[e]!=" "?cases[e]:0;
            let stat = document.createElement("div");
            stat.classList.add("stat");
            stat.innerHTML = e;
            infoItem.append(number,stat);
            infoItemsContainer.appendChild(infoItem);
                
                
            }
            info.append(date,infoItemsContainer);
            infoContainer.appendChild(info);
            main.appendChild(infoContainer);

            endLoading();
        })
        
    })
})
.catch(err => {
	console.error(err);
});
    }
        }
        else if(e.target.id ==="showAll"){
            //Show ALl Button
            console.log("show all");
        }
    }
    //Statistics Tab
    else if(Statistics.classList.contains("active")){
        if(e.target.id ==="show1"){
            let chosenCountry = document.querySelector("#country").value;
            if(chosenCountry == null || chosenCountry == ""){
                endLoading();
                let label = document.querySelector("label[for=country]");
                label.innerHTML = "Please Choose a country!";
                label.style.color = "yellow";
            }
            else{
                let label = document.querySelector("label[for=country]");
                label.style.display = "none";
                let header =document.querySelector("h1.app-info");
                header.innerHTML = chosenCountry + " COVID-19 HISTORY";
                chosenCountry = chosenCountry.toLowerCase();
            fetch(`https://covid-193.p.rapidapi.com/statistics?country=${chosenCountry}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "8eaecfd9f7msh49d0eb432a90d18p135577jsn1a31d77c491a",
                    "x-rapidapi-host": "covid-193.p.rapidapi.com"
                }
            })
            .then(response => {
                // endLoading();
              response.json().then(resStat=>{
                  let DataArr = resStat.response;
                DataArr.forEach(e=>{
                    let main = getElement("main");
                    let infoContainer = document.createElement("div");
                    infoContainer.classList.add("info-container");
                    let infoTag = document.createElement("div");
                    infoTag.classList.add("info-tags");
                    let infoImageContainer =document.createElement("div");
                    infoImageContainer.classList.add("info-image-container");
                    let img = document.createElement("img");
                    img.setAttribute("src",generateRandomImg(7,1));
                    img.setAttribute("alt","Random Mask image");
                    img.classList.add("info-image");
                    infoImageContainer.appendChild(img);
                    let text = document.createElement("p");
                    text.classList.add("info-text");
                    text.innerHTML = textD;
                    infoTag.append(infoImageContainer,text);
                    infoContainer.appendChild(infoTag);
                    let info = document.createElement("div");
                    info.classList.add("info");
                    let date = document.createElement("div");
                    date.classList.add("date");
                    date.innerHTML = "Date: " +e.time.slice(0,10) + " Time: " + e.time.slice(11,16) + "<br>"+"<b> " +e.continent+" "+ e.country+"</b>";
                    let infoItemsContainer =document.createElement("div");
                    infoItemsContainer.classList.add("info-items-container");
                    let cases = e.cases;
                    for(e in cases){
                      
                     let infoItem = document.createElement("div");
                    infoItem.classList.add("info-item");
                    let number = document.createElement("div");
                    number.classList.add("number");
                    number.innerHTML = cases[e]!=undefined || cases[e] != null || cases[e]!=" "?cases[e]:0;
                    let stat = document.createElement("div");
                    stat.classList.add("stat");
                    stat.innerHTML = e;
                    infoItem.append(number,stat);
                    infoItemsContainer.appendChild(infoItem);
                        
                        
                    }
                    info.append(date,infoItemsContainer);
                    infoContainer.appendChild(info);
                    main.appendChild(infoContainer);
                    endLoading();
                    
                })
              })
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
        else if(e.target.id ==="showAll"){
            fetch("https://covid-193.p.rapidapi.com/statistics", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "8eaecfd9f7msh49d0eb432a90d18p135577jsn1a31d77c491a",
                    "x-rapidapi-host": "covid-193.p.rapidapi.com"
                }
            })
            .then(response => {
                // endLoading();
              response.json().then(resStat=>{
                  let DataArr = resStat.response;
                DataArr.forEach(e=>{
                    let main = getElement("main");
                    let infoContainer = document.createElement("div");
                    infoContainer.classList.add("info-container");
                    let infoTag = document.createElement("div");
                    infoTag.classList.add("info-tags");
                    let infoImageContainer =document.createElement("div");
                    infoImageContainer.classList.add("info-image-container");
                    let img = document.createElement("img");
                    img.setAttribute("src",generateRandomImg(7,1));
                    img.setAttribute("alt","Random Mask image");
                    img.classList.add("info-image");
                    infoImageContainer.appendChild(img);
                    let text = document.createElement("p");
                    text.classList.add("info-text");
                    text.innerHTML = textD;
                    infoTag.append(infoImageContainer,text);
                    infoContainer.appendChild(infoTag);
                    let info = document.createElement("div");
                    info.classList.add("info");
                    let date = document.createElement("div");
                    date.classList.add("date");
                    date.innerHTML = "Date: " +e.time.slice(0,10) + " Time: " + e.time.slice(11,16) + "<br>"+"<b> " +e.continent+" "+ e.country+"</b>";
                    let infoItemsContainer =document.createElement("div");
                    infoItemsContainer.classList.add("info-items-container");
                    let cases = e.cases;
                    for(e in cases){
                      
                     let infoItem = document.createElement("div");
                    infoItem.classList.add("info-item");
                    let number = document.createElement("div");
                    number.classList.add("number");
                    number.innerHTML = cases[e]!=undefined || cases[e] != null || cases[e]!=" "?cases[e]:0;
                    let stat = document.createElement("div");
                    stat.classList.add("stat");
                    stat.innerHTML = e;
                    infoItem.append(number,stat);
                    infoItemsContainer.appendChild(infoItem);
                        
                        
                    }
                    info.append(date,infoItemsContainer);
                    infoContainer.appendChild(info);
                    main.appendChild(infoContainer);
                    endLoading();
        
                })
              })
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
}
    function generateRandomImg(max,min){
        let random = Math.floor((Math.random() * Math.ceil(max-min)) +1);
        let dir = `Images/@1X/img${random}.png`;
        return dir;
    }
    var textD = "Wear a mask</br> Clean your hands</br> Keep a safe distance";

    //FILTER
    var filter = document.querySelector("#filter");
    filter.addEventListener("input",filterData);
    function filterData(e){
        let val = e.target.value.toLowerCase();
        if(document.querySelector("div.info-container") != null){
            let cont = document.querySelectorAll("div.info-container");
             cont.forEach(e=>{
                 let date = e.querySelector(".date").innerText.toLowerCase();
                if(date.indexOf(val) > -1){
                    e.style.display = "flex";
                }
                else{
                    e.style.display = "none";
                }
             });

        }
        else{

        }
    }
    initApp();
    function showLoading(){
        let loader = document.querySelector(".anim");
        loader.classList.add("show");
    }
    function endLoading(){
        let loader = document.querySelector(".anim");
        loader.classList.remove("show");
    }

