// Time getString function
function getTimeString (times){
    const hours = parseInt(times / 3600);
    const remindSecondByHours = (hours % 3600);
    const minute = parseInt(remindSecondByHours / 60);
    const second = minute % 60;

    return `${hours} Hours ${minute} Minute ${second} Second ago`
};


// Loadcategory data

const loadCategoryData = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => loadDisplayData(data.categories))
        .catch(error => console.log(error))
};

// loadData show the display

const loadDisplayData = (categoryDatas) => {
    const loadBtnCategory = document.getElementById('category-btn');
    for(const showData of categoryDatas){
        // console.log(showData);
        // craete a button
        const button = document.createElement('button');
        button.classList = "btn text-lg font-semibold md:px-6";
        button.innerText = showData.category;
        loadBtnCategory.appendChild(button);
    }
};

// Load all videos container
const loadVideoData = () => {
    fetch ('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => loadDisplayVideos(data.videos))
        .catch(error => console.log(error))
};

// All videos show display
const loadDisplayVideos = (allVideos) => {
    const showAllVideos = document.getElementById('video-container');
    for(const video of allVideos){
        console.log(video);

        const div = document.createElement('div');
        div.classList = " ";
        div.innerHTML = `
            <div class = "relative">
                <img class = "h-[250px] w-full rounded object-cover " src = ${video.thumbnail}/>
                ${
                    video.others.posted_date?.length === 0 ? "" : `<span class = "absolute bg-slate-700 text-white px-3 rounded right-2 bottom-8">${getTimeString(video.others.posted_date)}</span>`
                };
                
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
                </div>
            </div>
        `;
        showAllVideos.appendChild(div);
    }
};





// Call all function
loadCategoryData();
loadVideoData();