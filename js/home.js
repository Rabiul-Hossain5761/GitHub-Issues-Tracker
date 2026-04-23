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