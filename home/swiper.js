const main_swiper = new Swiper('.main-swiper', {
    rewind: true,
    slidesPerView: 3,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        100:{
            slidesPerView: 1,
        },
        750:{
            slidesPerView:2,
        },
        890:{
            slidesPerView: 3,
        },
        1500:{
            slidesPerView: 4,
        },
    }
});

const review_swiper = new Swiper('.swiper-review', {
    rewind: true,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // optional
    pagination: {
        el: '.swiper-pagination',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
});