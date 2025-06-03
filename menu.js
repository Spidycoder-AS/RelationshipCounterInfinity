document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle-button');
  const menuItems = document.querySelector('.menu-items');
  const navButtons = document.querySelectorAll('.nav-button');

  // Add ripple effect to buttons
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  menuButton.addEventListener('click', function() {
    this.classList.toggle('active');
    menuItems.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-menu') && menuItems.classList.contains('active')) {
      menuButton.classList.remove('active');
      menuItems.classList.remove('active');
    }
  });

  // Add hover animation to buttons
  navButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}); 