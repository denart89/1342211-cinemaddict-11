const createSortItem = (title, hash, isActive) => {
  return `<li><a href="#${hash}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

const createSortTemplate = (sort) => {
  const sortItems = sort.map((it) => createSortItem(it.title, it.hash, it.isActive)).join(`\n`);

  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};

export {createSortTemplate};
