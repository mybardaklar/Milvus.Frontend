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

const PHomeWhatWeDoTabs = ["Forensic & Integrity", "Accounting Compliance & Reporting"];

const PServiceTabs = [
	"Adli Muhasebe & Suistimal İnceleme",
	"Suistimal Risk Yönetimi",
	"Kurumsal İstihbarat",
	"Ticari Uyuşmazlık Danışmanlığı",
	"Adli Bilişim & Elektronik Keşif",
	"Etik & Uyum",
];

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

	new Swiper(".PHome-WhatWeDo .swiper", {
		spaceBetween: 16,
		pagination: {
			clickable: true,
			el: "ul.PHome-WhatWeDo__tabs",
			renderBullet: function (index, className) {
				return `<li class="${className}">${PHomeWhatWeDoTabs[index]}</li>`;
			},
		},
	});

	new Swiper(".PService-Tab .swiper", {
		spaceBetween: 16,
		navigation: {
			prevEl: ".PService-Tab .PService-Tab__content .PService-Tab__nav button.PService-Tab__nav--prev",
			nextEl: ".PService-Tab .PService-Tab__content .PService-Tab__nav button.PService-Tab__nav--next",
		},
		pagination: {
			clickable: true,
			el: "ul.PService-Tab__tabs",
			renderBullet: function (index, className) {
				return `<li class="${className}">${PServiceTabs[index]}</li>`;
			},
		},
	});

	new Swiper(".PService-Case__slides .swiper", {
		spaceBetween: 16,
		navigation: {
			prevEl: "button.PService-Case__head__nav--prev",
			nextEl: "button.PService-Case__head__nav--next",
		},
		breakpoints: {
			768: {
				slidesPerView: "auto",
			},
		},
	});

	new Swiper(".PService-Insights .swiper", {
		spaceBetween: 16,
		navigation: {
			prevEl: "button.PService-Insights__nav--prev",
			nextEl: "button.PService-Insights__nav--next",
		},
		breakpoints: {
			768: {
				slidesPerView: "auto",
			},
		},
	});

	new Swiper(".PKariyer-Testimonials .swiper", {
		spaceBetween: 16,
		navigation: {
			prevEl: "button.PKariyer-Testimonials__head__prev",
			nextEl: "button.PKariyer-Testimonials__head__next",
		},
		breakpoints: {
			768: {
				slidesPerView: "auto",
			},
		},
	});

	new Swiper(".PKariyer-Why .swiper", {
		spaceBetween: 16,
		slidesPerView: "auto",
		navigation: {
			prevEl: "button.PKariyer-Why__head__prev",
			nextEl: "button.PKariyer-Why__head__next",
		},
	});
});
