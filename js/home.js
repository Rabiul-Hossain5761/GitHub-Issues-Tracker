const loadAllIssues = () =>{
    manageSpinn(true)
    removeActive();
    const clickBtn = document.getElementById("all-btn");
    clickBtn.classList.add("Active")
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json)=>displayAllIssues(json.data));
}
const displayAllIssues = (Issues) => {
    const allIssues = document.getElementById("Issues-container");
    const allIssuescount = document.getElementById("totalCount");
    allIssues.innerHTML="";
    allIssuescount.innerHTML=`
        <div class="flex items-center gap-3">
        <img class="w-10 h-10 object-contain" src="./images/Aperture.png" alt="">
        <div>
        <h2>${Issues.length} Issues</h2>
        <p>Track and manage your project issues</p>
        </div>
        </div>
        <div class="flex gap-5 items-center">
        <h2>open</h2>
        <h2>close</h2>
        </div>`;
        

    

    for(let issue of Issues){
        const card = document.createElement("div");
        const borderColor = issue.status === "open"
        ?"border-t-green-500":"border-t-purple-500";
        const logo = issue.status === "open"
        ?"./images/Open-Status.png":"./images/Closed- Status .png";
        card.innerHTML = `
        <div onclick ="loadModalData(${issue.id})" class="p-2 shadow-sm space-y-3 border-t-4 ${borderColor}">
        <div class="flex justify-between">
        <img class="object-contain" src="${logo}" alt="">
        <button class="btn">${issue.priority}</button>

        </div>
        <h2 class="line-clamp-1">${issue.title}</h2>
        <p class="line-clamp-2">The navigation menu doesn't collapse properly on mobile devices...</p>

        <div class="flex gap-2">
         ${createElement(issue.labels)}
        </div>

        <div class="space-y-2">
         <p>#1 by john_doe</p>
         <p>1/15/2024</p>
        </div>

        </div>`;
        allIssues.append(card);
    };
    manageSpinn(false)

    
};
const loadOpenIssues = () => {
    manageSpinn(true)
    removeActive();
    const clickBtn = document.getElementById("open-btn");
    clickBtn.classList.add("Active");
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json) => {
        const openIssues = json.data.filter(issue => issue.status==="open");
        displayOpenIssues(openIssues);
    })
}

const displayOpenIssues = (issues) => {

    const allOpenIssues = document.getElementById("Issues-container")
    allOpenIssues.innerHTML="";

    const allIssuescount = document.getElementById("totalCount");
    allIssuescount.innerHTML="";
    allIssuescount.innerHTML=`
        <div class="flex items-center gap-3">
        <img class="w-10 h-10 object-contain" src="./images/Aperture.png" alt="">
        <div>
        <h2>${issues.length} Issues</h2>
        <p>Track and manage your project issues</p>
        </div>
        </div>
        <div class="flex gap-5 items-center">
        <h2>open</h2>
        <h2>close</h2>
        </div>`;



    for(let issue of issues){
        const card = document.createElement("div");
        card.innerHTML=`
        <div onclick ="loadModalData(${issue.id})" class="p-2 shadow-sm space-y-3 border-t-4 border-t-green-500">
        <div class="flex justify-between">
        <img class="object-contain" src="./images/Open-Status.png" alt="">
        <button class="btn">${issue.priority}</button>

        </div>
        <h2 class="line-clamp-1">${issue.title}</h2>
        <p class="line-clamp-2">The navigation menu doesn't collapse properly on mobile devices...</p>

        <div class="flex gap-2 border-b-1 pb-2">
         ${createElement(issue.labels)}
        </div>

        <div class="space-y-2">
         <p>#1 by ${issue.author}</p>
         <p>${issue.createdAt}</p>
        </div>

        </div>`;
        allOpenIssues.append(card);
    }
    manageSpinn(false)
}


const loadClosedIssues = () => {
    manageSpinn(true)
    removeActive();
    const clickBtn = document.getElementById("close-btn");
    clickBtn.classList.add("Active");
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((json) => {
        const closedIssues = json.data.filter(issue => issue.status==="closed");
        displayClosedIssues(closedIssues);
    })
}

const displayClosedIssues = (issues) => {

    const allClosedIssues = document.getElementById("Issues-container")
    allClosedIssues.innerHTML="";

    const allIssuescount = document.getElementById("totalCount");
    allIssuescount.innerHTML="";
    allIssuescount.innerHTML=`
        <div class="flex items-center gap-3">
        <img class="w-10 h-10 object-contain" src="./images/Aperture.png" alt="">
        <div>
        <h2>${issues.length} Issues</h2>
        <p>Track and manage your project issues</p>
        </div>
        </div>
        <div class="flex gap-5 items-center">
        <h2>open</h2>
        <h2>close</h2>
        </div>`;



    for(let issue of issues){
        const card = document.createElement("div");
        card.innerHTML=`
        <div onclick ="loadModalData(${issue.id})" class="p-2 shadow-sm space-y-3 border-t-4 border-t-purple-500">
        <div class="flex justify-between">
        <img class="object-contain" src="./images/Closed- Status .png" alt="">
        <button class="btn">${issue.priority}</button>

        </div>
        <h2 class="line-clamp-1">${issue.title}</h2>
        <p class="line-clamp-2">The navigation menu doesn't collapse properly on mobile devices...</p>

        <div class="flex gap-2 border-b-1 pb-2">
         ${createElement(issue.labels)}
        </div>

        <div class="space-y-2">
         <p>#1 by ${issue.author}</p>
         <p>${issue.createdAt}</p>
        </div>

        </div>`;
        allClosedIssues.append(card);
    }
    manageSpinn(false)
};

const loadModalData = (id) =>{
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>displayModalData(json.data));
}


const displayModalData = (details) =>{
     const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML=`
    <div class="space-y-2">
    <h1 class="text-2xl font-bold">${details.title}</h1>
    <div class="flex gap-2">
    <p>${details.status}</p>
    <p>${details.assignee}</p>
    <p>${details.updatedAt}</p>
    </div>
    <div class="flex gap-2">${createElement(details.labels)}
    </div>
    <p>${details.description}</p>
    <div class="grid grid-cols-2 gap-2">
    <div class="bg-slate-100 p-2">
    <p>Author:</p>
    <p class="font-bold">${details.author}</p>
    </div>
    <div class="bg-slate-100 p-2">
    <p>Priority:</p>
    <p>${details.priority}</p>

    </div>
    </div>
    </div>`
    document.getElementById("my_modal_5").showModal();

}

const removeActive = () => {
   const buttons = document.querySelectorAll(".btn-outline");
    buttons.forEach(btn => btn.classList.remove("Active"));

};
const createElement = (arr) =>{
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ");

};

const manageSpinn = (status) =>{
    if(status === true){
        document.getElementById("spinn").classList.remove("hidden");
        document.getElementById("Issues-container").classList.add("hidden");

    }
    else{
        document.getElementById("Issues-container").classList.remove("hidden");
        document.getElementById("spinn").classList.add("hidden");
    }
}

loadAllIssues();
