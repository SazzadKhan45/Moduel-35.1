// Time getString function
function getTimeString (times){
    const hours = parseInt(times / 3600);
    const remindSecondByHours = (hours % 3600);
    const minute = parseInt(remindSecondByHours / 60);
    
    return `${hours} Hours ${minute} Minute ago`
};


// Loadcategory data

const loadCategoryData = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => loadDisplayData(data.categories))
        .catch(error => console.log(error))
};


// btn active class remove
const removeActiveClassBtn = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons){
        btn.classList.remove('active');
    }
}

// Load all videos function by all btn click
const allVideoBtnClick = () =>{
    loadVideoData();
    removeActiveClassBtn();
}

// Load videos function by click category btn
const loadVideos = (id) =>{
        fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // sobai ka active class remove koro vai
            removeActiveClassBtn();
            // click id ar active class add koro

            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            loadDisplayVideos(data.category)
        })
        .catch(error => console.log(error))
}


// loadData show the display

const loadDisplayData = (categoryDatas) => {
    const loadBtnCategory = document.getElementById('category-btn');
    for(const showData of categoryDatas){
        // console.log(showData);
        // craete a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id = "btn-${showData.category_id}" onclick="loadVideos(${showData.category_id})" class ="btn text-lg font-semibold md:px-6 category-btn">
                ${showData.category}
            </button>
        `;
        loadBtnCategory.appendChild(buttonContainer);
    }
};

// Load all videos container
const loadVideoData = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => loadDisplayVideos(data.videos))
        .catch(error => console.log(error))
};

// load videos details function

const loadVideosDetails = async(videoId) =>{
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    videsDetailsBtnClick(data.video)

};

// videos details load function

const videsDetailsBtnClick = (videosDetails) =>{
    console.log(videosDetails);
    const modalBoxContent = document.getElementById('modal-content');
    // one way click modal custom id
    document.getElementById('show-modals').click();
    // show daisyUi oncick handler
    document.getElementById('customModal').showModal();

    modalBoxContent.innerHTML = `
        <img class ="rounded-lg" src=${videosDetails.thumbnail} />
        <p class="my-4">${videosDetails.description}</p>
    `;
}



// All videos show display
const loadDisplayVideos = (allVideos) => {
    const showAllVideos = document.getElementById('video-container');
    showAllVideos.innerHTML = "";

    if(allVideos.length === 0){
        showAllVideos.classList.remove('grid');
        showAllVideos.innerHTML = `
            <div class ="md:min-h-[300px] flex flex-col justify-center items-center gap-6 mt-12 md:mt-40">
                <img class ="w-[250px] md:w-[300px] mb-8 mx-auto" src="assets/Icon.png"/>
                <h2 class ="text-3xl font-bold ">Oops!! Sorry, There is no<br>content here</h2>
            </div>
        `;
        return;
    }
    else{
        showAllVideos.classList.add('grid');
    }

    for(const video of allVideos){
        // console.log(video);

        const div = document.createElement('div');
        div.classList = " ";
        div.innerHTML = `
            <div class = "relative">
                <img class = "h-[250px] w-full rounded object-cover " src = ${video.thumbnail}/>
                ${
                    video.others.posted_date?.length === 0 ? "" : `<span class = "absolute bg-slate-700 text-white px-3 rounded right-2 bottom-8">${getTimeString(video.others.posted_date)}</span>`
                }
                
            </div>
            <div class = "flex gap-4 mt-4">
                <div>
                    <img class = "w-[50px] h-[50px] rounded-full object-cover" src = ${video.authors[0].profile_picture}/>
                </div>
                <div>
                    <h2 class = "text-lg font-bold">${video.title}</h2>
                    <div class = "flex gap-5 items-center">
                        <h3 class = "text-gray-700 font-semibold">${video.authors[0].profile_name}</h3>
                            ${video.authors[0].verified === true ? `
                            <img class = "w-[20px]" src ="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />
                            ` : ''}    
                    </div>
                    <p class = "text-gray-700">Views ${video.others.views}</p>
                    <div>
                    <p> 
                        <button onclick ="loadVideosDetails('${video.video_id}')" class ="btn btn-secondary text-white text-lg my-4">More details</button>
                    </p>
                </div>
                </div>
                
            </div>
        `;
        showAllVideos.appendChild(div);
    }
};





// Call all function
loadCategoryData();
loadVideoData();