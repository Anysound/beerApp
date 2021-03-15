export const initSlider = () => {
  let prevBtn = document.querySelector('.buttons__left');
  let nextBtn = document.querySelector('.buttons__right');
  let slidesItems = document.getElementsByClassName('slider__item');
  console.clear();
  console.log(slidesItems)
  let slideIndex = 1;
  
  showSlides(slideIndex);
  
  function showSlides(n) {
    if (n < 1) {
       slideIndex = slidesItems.length;
    } else if (n > slidesItems.length) {
      slideIndex = 1;
    }
    for (let i = 0; i < slidesItems.length; i++) {
      // slides[i].style.transition = '1s linear';
      // console.log('test');
      // slides[i].style.width = '100vw'
   // slides[slideIndex - 1].classList.toggle('slider__item--animate');
  
   slidesItems[i].style.display = 'none';
    }
  
    slidesItems[slideIndex - 1].style.display = 'block';
  }
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  prevBtn.addEventListener('click', () => {
    plusSlides(-1);
  });
  
  nextBtn.addEventListener('click', () => {
    plusSlides(1);
  })
}
