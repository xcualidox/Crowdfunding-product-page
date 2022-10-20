// Reset modal every time page is refreshed 
document.querySelector("#modalContainer").reset();
// Adding click event to bookmar
document.querySelector(".wrapper .bookmark").addEventListener("click", (e)=>{
    // Everytime is clicked bookmar change its status, toggling class in order to change its bg-color
    // and adding 'ed' prefix to become bookmarked
    let text= document.querySelector(".wrapper .bookmark p");
    document.querySelector(".wrapper .bookmark").classList.toggle("bookmark-active");
    document.querySelector(".wrapper .bookmark .bookmark-img2").classList.toggle("bookmark-active1");
    document.querySelector(".wrapper .bookmark .bookmark-img").classList.toggle("bookmark-active2");
    text.classList.toggle("text-active");
    // if ed prefix exist then remove it
    if(!text.innerHTML.includes("ed")){
        text.innerText+="ed";
    }
    else{
        text.innerText= text.innerHTML.slice(0,-2)
    }
})
// Function used to prevent no numerical character in number inputs  
function preventNonNumericalInput(e) {
    
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    // used to limit the input lenght
    if(this.value.length==6){  
        e.preventDefault();
    }
    //using regex to prevent no numerical caracther
    if (!charStr.match(/^[0-9,.]+$/))
      e.preventDefault();
}
//used to open navigation bar
function openNav(){
    const nav = document.querySelector(".navbar");
    const openCloseIcons = document.querySelector(".open-close");
    const cssVariables = document.querySelector(":root");
    // changing css variables to change before or after opacity
    let opacity = getComputedStyle(cssVariables).getPropertyValue("--opacity")
    if(opacity==1){
        cssVariables.style.setProperty("--opacity","0");
        cssVariables.style.setProperty("--pointer-event","none");
    }
    else{
        cssVariables.style.setProperty("--opacity","1");
        cssVariables.style.setProperty("--pointer-event","all");
    }
    // showing navbar and close icon, hide hamburger icon
    nav.classList.toggle("openNav");
    openCloseIcons.children[0].classList.toggle("inactive-open")
    openCloseIcons.children[1].classList.toggle("active-close")
}
// Active status in modal cars
function selected(){
    const active = document.querySelector(".card-active");
    const activePledgeSection = document.querySelector(".card-pledge-active");
    const card = this.parentElement.parentElement;
    // selecting the correct element taking in consideration it is a no reward card or not
    const pledgeSection = card.children[2].nodeName == "LABEL" ? card.children[2]: card.children[3];
    if(active){
        // remove active status in other cards
        active.classList.remove("card-active");
        activePledgeSection.classList.remove("card-pledge-active")
    }
    // adding active status
        card.classList.add("card-active");
        pledgeSection.classList.add("card-pledge-active")
    
}
// Opens modal section
function openModal(){
    // used when modal is open through intro section btn 
    // determine the card and select it automatically
    if(this.hasAttribute("data-pledge")){
        document.querySelector(this.getAttribute("data-pledge") == "bamboo"? "#b_stand" : "#b_edition").click();
    }
    //changing css variables to change body after or before opacity
    const cssVariables = document.querySelector(":root");
    cssVariables.style.setProperty("--opacity-modal","1");
    cssVariables.style.setProperty("--pointer-modal","all");
    document.querySelector(".modal").style.display="block";
}
// close modal
function closeModal(value){
    // Selector to determine if it's closed through modal close icon or using 'Got it!' button after a pledge
    let selector = this.innerText == "Got it!" ? ".pledge-succesfull" : ".modal" ;
    //storing active cards with a active pledge section
    const activePledgeSection = document.querySelector(".card-pledge-active");
    //storing activated cards
    const active = document.querySelector(".card-active");
    //Css variables. Used to change body before or after opacity and pointers events
    const cssVariables = document.querySelector(":root");
    //Used to close just modal section and not body after or body before when a pledge is made
    if(value!="onlyModal"){
        cssVariables.style.setProperty("--opacity-modal","0");
        cssVariables.style.setProperty("--pointer-modal","none");
    }
    //Adding .modal-exit to show an exit animation
    document.querySelector(selector).classList.add("modal-exit");
    //Interval used to wait for the animation before hidden the selector
    setTimeout(()=>{
        document.querySelector(selector).style.display="none";
        document.querySelector(selector).classList.remove("modal-exit");
        //if there is a active card then remove its active status
        if(active){
            active.classList.remove("card-active");
            activePledgeSection.classList.remove("card-pledge-active")
            document.querySelector("#modalContainer").reset();
        }
        
    }, 400);
}
//Function used to send a pledge 
function sendPledge(){
    //Input with pledge value
    let pledgeAmount = this.previousElementSibling.firstElementChild;
    if (pledgeAmount.value==""){
        return false;
    }
    // if statement used to determine if is the correct amount in case it's from a rewarded pledge
    if(pledgeAmount.id == "pledge_amount1" || pledgeAmount.id == "pledge_amount2" ){
        if(pledgeAmount.id == "pledge_amount1"){
            if(pledgeAmount.value < 25) return false;
        }
        if(pledgeAmount.id == "pledge_amount2"){
            if(pledgeAmount.value < 75) return false;
        }
        // rewarded cards selectors
        let reward1 = document.querySelector(`#${pledgeAmount.id == "pledge_amount1"? "stock-reward": "stock-reward1"}`);
        let reward2 =  document.querySelector(`#${pledgeAmount.id == "pledge_amount1"? "stock-reward2": "stock-reward3"}`);
        // substranting 1 to the value
        reward1.innerHTML = parseInt(reward1.innerText) - 1;
        reward2.innerHTML = parseInt(reward2.innerText) - 1;
        // if The stock is 0 then changed to 'out of stock'
        if(parseInt(reward1.innerText) == 0){
            reward1.parentElement.parentElement.classList.add("out-of-stock");
            reward2.parentElement.parentElement.classList.add("out-of-stock");
        }
    }
    //goal section values
    let totalBacked = document.querySelector("#goal");
    //removing commas from the total amount
    let totalBackedAmount = totalBacked.innerText.substring(1,totalBacked.innerHTML.length).replace(/,/g,"");
    let backers = document.querySelector("#backers");
    let progress = document.querySelector("#progress");
    // sums the total value with the pledged value and adds commas if value is over 1 thousand
    totalBacked.innerHTML = `$${(parseInt( totalBackedAmount) + 
        parseInt(pledgeAmount.value)).toLocaleString("en-US")}`;
    // Removing commas and adding one backer    
    backers.innerHTML = parseInt( backers.innerHTML.replace(/,/g,"")) + 1;
    //Increase progress bar value depending in pledged value
    progress.value += parseInt(pledgeAmount.value) ;
    // invoke closeModal function, using 'OnlyModal' parameter 
    closeModal("onlyModal");
    //activate succesful message
    document.querySelector(".pledge-succesfull").style.display="block";
}
//adding events to DOM elements
document.querySelectorAll(".btn-send").forEach((element) =>{
    element.addEventListener("click", sendPledge);
})
document.querySelectorAll("input[type='radio']").forEach((element)=>{
    element.addEventListener("click",selected)
})
document.querySelector(".intro button").addEventListener("click", openModal)
document.querySelectorAll("a[data-pledge]").forEach((element)=>{
    element.addEventListener("click",openModal);
})
document.querySelector(".close-modal").addEventListener("click", closeModal)
document.querySelector(".open-nav").addEventListener("click", openNav);
document.querySelectorAll("input.amount").forEach((element) =>{
    element.addEventListener("keypress",preventNonNumericalInput);
})
document.querySelector(".pledge-succesfull .btn").addEventListener("click", closeModal)