export const favoritesBeerTemplate = (title, id) => {
  return (
    `<li class="list-group-item">
      ${title} <h6 class="float-right text-secondary">
      <i data-favorites="${id}" class="fas fa-trash-alt" style="cursor: pointer"></i></h6>
    </li>`
  )
}
