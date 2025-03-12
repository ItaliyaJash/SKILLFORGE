// Course data
const courses = [
    {
        id: 1,
        title: 'Web Development Fundamentals',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
        rating: 4.7,
        duration: '8 weeks',
        students: '1,250',
        description: 'Learn the core concepts of web development including HTML, CSS, and JavaScript.'
    },
    {
        id: 2,
        title: 'Advanced Healthcare Management',
        category: 'Healthcare',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 4.9,
        duration: '12 weeks',
        students: '850',
        description: 'Develop skills in healthcare administration and patient management systems.'
    },
    {
        id: 3,
        title: 'Modern Agricultural Techniques',
        category: 'Agriculture',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        rating: 4.5,
        duration: '10 weeks',
        students: '920',
        description: 'Explore sustainable farming methods and agricultural technology applications.'
    }
];

// Navigation highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Modal handling
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    Array.from(modals).forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Render course cards
function renderCourses(coursesToRender = courses) {
    const courseGrid = document.querySelector('.course-grid');
    courseGrid.innerHTML = coursesToRender.map(course => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-content">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: #0040c1; font-weight: 600;">${course.category}</span>
                    <div>
                        <span>⭐ ${course.rating}</span>
                    </div>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${course.title}</h3>
                <p style="color: #666; margin-bottom: 1rem;">${course.description}</p>
                <div style="display: flex; justify-content: space-between; color: #666; font-size: 0.875rem;">
                    <span>⏱ ${course.duration}</span>
                    <span>👥 ${course.students} students</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter courses
function setupCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter courses
            const category = button.textContent;
            if (category === 'All Courses') {
                renderCourses();
            } else {
                const filteredCourses = courses.filter(course => course.category === category);
                renderCourses(filteredCourses);
            }
        });
    });
}

// Form handling
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login attempt:', { email, password });
        toggleModal('loginModal');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        console.log('Signup attempt:', { name, email, password });
        toggleModal('signupModal');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    renderCourses();
    setupCourseFilters();
    setupForms();
});
