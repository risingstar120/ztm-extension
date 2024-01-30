/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 30, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Boxicons style
const boxiconsCss = document.createElement('link');
boxiconsCss.rel = 'stylesheet';
boxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Boxicons style to the head
document.head.appendChild(boxiconsCss);

const addFavCourseDiv = () => {
    // get the course filter
    const courseFilter = document.querySelector('.course-filter');

    const favCourseDiv = document.createElement('div');
    favCourseDiv.innerHTML = `
    <div class="pull-left course-filter ztm-fav-course-button">
        <div class="filter-label">
            Favorites:
        </div>
        <div class="btn-group">
            <button class="btn btn-default btn-lg btn-course-filter dropdown-toggle" type="button">
                <i class="bx bxs-heart filtered-fav-courses" id="ztm-fav-course-heart-icon"></i>
            </button>
        </div>
    </div>
    `

    courseFilter.parentNode.insertBefore(favCourseDiv, courseFilter.nextSibling);

// progressBar.parentNode.insertBefore(ztmSidebarSectionTimesDiv, progressBar.nextSibling);

};

// Add favorite course heart icon
const ztmFavoriteCourse = () => {
    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing');

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row');
        
        // Create a new div
        const ztmFavCourseDiv = document.createElement('div');
        ztmFavCourseDiv.id = 'ztm-fav-course'
        // Create heart icon element 
        // <i class='bx bxs-heart' id='ztm-heart'></i>
        let ztmHeartIcon = document.createElement('i');
        ztmHeartIcon.classList.add('bx', 'bxs-heart');
        ztmHeartIcon.id = 'ztm-heart-icon'

        // Add course title as the class name for storing fav courses
        let getCourseTitle = courseCard.querySelector('.course-listing-title')
        let courseTitle = getCourseTitle.textContent.replaceAll(' ', '').replaceAll(':', '').trim();
        ztmHeartIcon.classList.add(courseTitle);

        // Add `ztmHeartIcon` to `ztmFavCourseDiv`
        ztmFavCourseDiv.appendChild(ztmHeartIcon);

        // Add `ztmHeartIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmFavCourseDiv);
    });

    // Get all the heart icon
    let ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

    // add toggle click
    ztmHeartIcon.forEach(function (heartIcon) {
        // Get course title class for storing favorite course
        let courseTitle = heartIcon.classList[2]

        // Get the favorite courses from the local storage
        let isFavorited = localStorage.getItem(`${courseTitle}_isFavorited`) === 'true';
        // Add to the course is favorited
        if (isFavorited) {
            heartIcon.classList.add('ztm-heart-icon-clicked');
        };

        // Toggle heart icon click
        heartIcon.addEventListener('click', function (event) {
            // Disable to click
            event.stopPropagation();

            // Toggle `ztm-heart-icon-clicked` class
            this.classList.toggle('ztm-heart-icon-clicked');

            // Store the click state
            let isFavorited = this.classList.contains('ztm-heart-icon-clicked');
            localStorage.setItem(`${courseTitle}_isFavorited`, isFavorited);
        });
    });
}

addFavCourseDiv();
ztmFavoriteCourse();

