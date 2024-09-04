document.addEventListener("alpine:init", () => {
	Alpine.store("navigationDrawer", {
		active: false,
		activate() {
			this.active = true;
		},
		deactivate() {
			this.active = false;
		},
	});

	Alpine.data("CAppHeader", () => ({
		headerFixed: false,
		headerHidden: false,
		dropdownId: "",

		CAppHeaderBinding: {
			[":class"]() {
				return {
					"CAppHeader--fixed": this.headerFixed,
					"CAppHeader--hidden": this.headerHidden,
				};
			},
		},

		CAppHeaderDropdownTriggerBinding: {
			["@mouseenter.prevent"]() {
				this.dropdownId = this.$el.dataset.dropdownId;
			},
			["@mouseleave.prevent"]() {
				this.dropdownId = "";
			},
			[":class"]() {
				return {
					"u-active": this.dropdownId === this.$el.dataset.dropdownId,
				};
			},
		},

		CAppHeaderDropdownBinding: {
			["@mouseenter.prevent"]() {
				this.dropdownId = this.$el.dataset.dropdownId;
			},
			["@mouseleave.prevent"]() {
				this.dropdownId = "";
			},
			[":class"]() {
				return {
					"CAppHeader__megamenu--active": this.dropdownId === this.$el.dataset.dropdownId,
				};
			},
		},

		CAppHeaderScrollFunction(e) {
			this.headerFixed = window.pageYOffset > 100 ? true : false;

			if (window.pageYOffset <= 100) {
				this.headerHidden = false;
				this.headerFixed = false;
			}
		},

		CAppHeaderWheelFunction(e) {
			if (this.dropdownId === "") {
				if (Math.sign(e.wheelDelta) === -1) {
					this.headerHidden = true;
				} else {
					this.headerHidden = false;
				}
			}
		},
	}));
});

document.addEventListener("DOMContentLoaded", () => {
	new Swiper("#PProductDetail-Attachments__Slider", {
		spaceBetween: 16,
		navigation: {
			prevEl: "#PProductDetail-Attachments__Slider__PrevButton",
			nextEl: "#PProductDetail-Attachments__Slider__NextButton",
		},
		breakpoints: {
			768: {
				slidesPerView: "auto",
			},
		},
	});

	new Swiper("#PCaseStudyDetail-Challanges__Slider", {
		spaceBetween: 16,
		slidesPerView: 1,
		pagination: {
			el: "#PCaseStudyDetail-Challanges__Slider .swiper-pagination",
		},
	});

	new Swiper("#PCaseStudyDetail-Roots__Slider", {
		spaceBetween: 16,
		navigation: {
			prevEl: "#PCaseStudyDetail-Roots__Slider__PrevButton",
			nextEl: "#PCaseStudyDetail-Roots__Slider__NextButton",
		},
		breakpoints: {
			768: {
				slidesPerView: "auto",
			},
		},
	});

	initAnimations();
});

function initAnimations() {
	// gsap starts here
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	const sections = document.querySelectorAll("section[data-section]");
	sections.forEach((item) => {
		let getAttr = item.getAttribute("data-section");
		gsap.from(`section[data-section="${getAttr}"]`, {
			scrollTrigger: {
				start: "top center",
				end: "bottom 60%",
				markers: false,
				toggleActions: "play pause reverse reset",
				onEnter: () => {
					console.log(`nav.PProductDetail-Detail__nav ul li[data-section="${getAttr}"]`);
					document
						.querySelectorAll("nav.PProductDetail-Detail__nav ul li")
						.forEach((li) => li.classList.remove("u-active"));
					document
						.querySelector(
							`nav.PProductDetail-Detail__nav ul li[data-section="${getAttr}"]`
						)
						.classList.add("u-active");
				},
				onEnterBack: () => {
					console.log(`nav.PProductDetail-Detail__nav ul li[data-section="${getAttr}"]`);
					document
						.querySelectorAll("nav.PProductDetail-Detail__nav ul li")
						.forEach((li) => li.classList.remove("u-active"));
					document
						.querySelector(
							`nav.PProductDetail-Detail__nav ul li[data-section="${getAttr}"]`
						)
						.classList.add("u-active");
				},
				onLeave: () => {
					document
						.querySelectorAll("nav.PProductDetail-Detail__nav ul li")
						.forEach((li) => li.classList.remove("u-active"));
				},
				onLeaveBack: () => {
					document
						.querySelectorAll("nav.PProductDetail-Detail__nav ul li")
						.forEach((li) => li.classList.remove("u-active"));
				},
				trigger: `section[data-section="${getAttr}"]`,
			},
		});
	});

	const titles = document.querySelectorAll(".PBlogDetail-Content [data-title]");
	titles.forEach((item) => {
		let getAttr = item.getAttribute("data-title");
		console.log(getAttr);

		gsap.from(`.PBlogDetail-Content [data-title="${getAttr}"]`, {
			scrollTrigger: {
				start: "top 20%",
				end: "bottom 20%",
				markers: false,
				toggleActions: "play pause reverse reset",
				onEnter: () => {
					document
						.querySelectorAll("aside.PBlogDetail-Sidebar ul li")
						.forEach((li) => li.classList.remove("u-active"));
					document
						.querySelector(`aside.PBlogDetail-Sidebar ul li[data-title="${getAttr}"]`)
						.classList.add("u-active");
				},
				onEnterBack: () => {
					document
						.querySelectorAll("aside.PBlogDetail-Sidebar ul li")
						.forEach((li) => li.classList.remove("u-active"));
					document
						.querySelector(`aside.PBlogDetail-Sidebar ul li[data-title="${getAttr}"]`)
						.classList.add("u-active");
				},
				onLeave: () => {
					document
						.querySelectorAll("aside.PBlogDetail-Sidebar ul li")
						.forEach((li) => li.classList.remove("u-active"));
				},
				onLeaveBack: () => {
					document
						.querySelectorAll("aside.PBlogDetail-Sidebar ul li")
						.forEach((li) => li.classList.remove("u-active"));
				},
				trigger: `.PBlogDetail-Content [data-title="${getAttr}"]`,
			},
		});
	});

	const elements_up = document.querySelectorAll(".gsap-reveal");

	elements_up.forEach((element) => {
		const yValue = element.getAttribute("data-y") || 50;
		const xValue = element.getAttribute("data-x") || 0;
		const delayValue = element.getAttribute("data-delay") || 0;

		gsap.from(element, {
			duration: 1.5,
			y: parseFloat(yValue),
			x: parseFloat(xValue),
			opacity: 0,
			delay: parseFloat(delayValue),
			ease: "power2.out",
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				toggleActions: "play none none none",
			},
		});
	});

	const flip_elements = document.querySelectorAll(".flip-on-scroll");

	// Iterate over each element and apply the scroll-triggered flip animation
	flip_elements.forEach((element) => {
		gsap.from(element, {
			duration: 1, // Duration of the flip animation
			rotationX: 180, // Flip 180 degrees on the X-axis
			opacity: 0, // Start with 0 opacity
			ease: "back.out(1.7)", // Easing function for a smooth and elastic effect
			transformOrigin: "center bottom", // Set transform origin for the flip effect
			scrollTrigger: {
				trigger: element, // Element that triggers the animation
				start: "top 80%", // Start the animation when the top of the element hits 80% of the viewport
				toggleActions: "play none none none", // Play the animation when it enters the viewport
			},
		});
	});

	const blocks = document.querySelectorAll(".float-around");

	// Iterate over each block and apply the floating animation
	blocks.forEach((block) => {
		gsap.to(block, {
			duration: 3, // Duration of the animation
			x: "random(-20, 20)", // Random movement on the x-axis within a range
			y: "random(-20, 20)", // Random movement on the y-axis within a range
			ease: "sine.inOut", // Smooth, continuous motion with sine easing
			repeat: -1, // Infinite looping
			yoyo: true, // Reverse the animation back and forth
			delay: Math.random(), // Random delay to stagger the start of each element
		});
	});
}
