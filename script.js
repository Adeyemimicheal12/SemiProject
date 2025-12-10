// Smooth scroll animations on page load and scroll
document.addEventListener("DOMContentLoaded", () => {
  // Set active nav link on page load
  updateActiveNavLink()

  // Trigger animations on initial page load
  triggerScrollAnimations()

  // Add scroll event listener for animations
  window.addEventListener("scroll", triggerScrollAnimations)

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Add to cart button feedback
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent
      this.textContent = "Added to Cart!"
      setTimeout(() => {
        this.textContent = originalText
      }, 1500)
    })
  })
})

// Update active nav link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-links a")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
}

// Trigger scroll animations
function triggerScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom

    // Check if element is in viewport
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("visible")
    }
  })
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault()

  const formMessage = document.getElementById("formMessage")
  const form = e.target

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Simple validation
  if (!name || !email || !subject || !message) {
    showFormMessage("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showFormMessage("Please enter a valid email address.", "error")
    return
  }

  // Simulate form submission (in real scenario, this would go to a backend)
  console.log("Form submitted:", { name, email, subject, message })

  showFormMessage("Thank you! Your message has been sent successfully. We'll get back to you soon!", "success")
  form.reset()

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
}

// Show form message
function showFormMessage(message, type) {
  const formMessage = document.getElementById("formMessage")
  formMessage.textContent = message
  formMessage.className = `form-message ${type}`
  formMessage.style.display = "block"
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
