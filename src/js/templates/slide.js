export const createSlideTemplate = (index) => {
  return (
    `<div class="slider__item slide">
      <div class="row slide__wrapper slide__wrapper--${index}"></div>
    </div>`
  )
};
