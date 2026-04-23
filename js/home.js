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