class Products {

  constructor() {
    this.classNameActive = 'products-element__btn_active';
    this.labelAdd = 'Купить';
    this.labelRemove = 'Удалить';
  }

  handleSetLocationStorage(element, id) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);

    if (pushProducts) {
      element.classList.add(this.classNameActive);
      element.innerText = this.labelRemove;
    } else {
      element.classList.remove(this.classNameActive);
      element.innerText = this.labelAdd;
    }
    headerPage.render(products.length);
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = '';
    let htmlCatalog2 = '';
    
    CATALOG.forEach(({ id, name, price, img, rate }) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = ' ' + this.classNameActive;
        activeText = this.labelRemove;
      }

      htmlCatalog += `
      <li class='products-element'>
        <div class='products-element__img'>
          <img src='${img}'/>
        </div>
        <div class='products-element__info'>
          <span class='products-element__name'>${name}</span> 
          <span class='products-element__price'>${price} ₽</span>
          <span class='products-element__rate'>⭐${rate}</span>
          <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                        ${activeText}
                    </button>
        </div>
      </li>
      `;
    });

    CATALOG2.forEach(({ id, name, price, img, rate }) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = ' ' + this.classNameActive;
        activeText = this.labelRemove;
      }

      htmlCatalog2 += `
      <li class='products-element'>
        <div class='products-element__img'>
          <img src='${img}'/>
        </div>
        <div class='products-element__info'>
          <span class='products-element__name'>${name}</span> 
          <span class='products-element__price'>${price} ₽</span>
          <span class='products-element__rate'>⭐${rate}</span>
          <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                        ${activeText}
                    </button>
        </div>
      </li>
      `;
    })
    const html = `
    <h1 class='title'>Наушники</h1>
      <ul class='products-container'>
      ${htmlCatalog}
      </ul>
      <h1 class='title'>Беспроводные наушники</h1>
      <ul class='products-container'>
      ${htmlCatalog2}
      </ul>
    `;

    ROOT_PRODUCTS.innerHTML = html
  }
}

const productsPage = new Products();
productsPage.render();