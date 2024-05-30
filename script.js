document.addEventListener('DOMContentLoaded', function() {
    const cursorAura = document.querySelector('.cursor-aura');
    const navLinks = document.querySelectorAll('.nav-vertical a');
    const sections = document.querySelectorAll('section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function updateActiveNavLink() {
        navLinks.forEach(function(navLink) {
            navLink.classList.remove('active');
        });

        sections.forEach(function(section) {
            if (isInViewport(section)) {
                const sectionId = section.getAttribute('id');
                const activeNavLink = document.querySelector(`.nav-vertical a[href="#${sectionId}"]`);
                activeNavLink.classList.add('active');
                console.log('Section in viewport:', sectionId);
            }
        });
    }

    updateActiveNavLink();

    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });

    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    document.addEventListener('mousemove', function(e) {
        const auraSize = 700;
        const auraOffset = auraSize / 2;
        const x = e.clientX - auraOffset;
        const y = e.clientY - auraOffset;

        cursorAura.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.querySelectorAll('.spec_hover.job-row').forEach(function(item) {
        item.addEventListener('mouseover', function() {
            var prevElements = document.querySelectorAll('.spec_hover.job-row');
            prevElements.forEach(function(element) {
                if (element !== item) {
                    element.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseout', function() {
            var prevElements = document.querySelectorAll('.spec_hover.job-row');
            prevElements.forEach(function(element) {
                if (element !== item) {
                    element.style.opacity = '1';
                }
            });
        });
    });
});