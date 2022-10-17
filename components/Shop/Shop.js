class Shop {
  constructor(){
    this.cartElement = 'cart-element';
  }
  

  deleteItems(element, id) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);
    if (pushProducts) {
      element.classList.remove(this.cartElement)
    }
    shopPage.render(products.length);
    }

  increaseCount(id, count){
    const { products } = localStorageUtil.putProducts(id);
    if(count > 0 && count !== null){
    products.count++}
    shopPage.render()
  }

  decreaseCount(id, count){
    const { products } = localStorageUtil.putProducts(id)
    if(count > 0 && count !== null){
      products.count--
    } else {
      this.deleteItems
    }
    shopPage.render()
  }

  catalog = CATALOG.concat(CATALOG2)
  render() {
    const productsStore = localStorageUtil.getProducts();
    
    let htmlCatalog = '';
    let htmlCatalog2 = '';
    let summCatalog = 0;
    productsStore.forEach((item) => {
      const cartItem = this.catalog.find(cartEl => cartEl.id === item.id)
      console.log(cartItem)
        htmlCatalog += `
        <li class='${this.cartElement}' >
        <div class='cart-element__img'>
          <img src="${cartItem.img}"/>
        </div>
        <div class='cart-element__info'>
          <span class='cart-element__name'>${cartItem.name}</span> 
          <span class='cart-element__price'>${cartItem.price} ₽</span>
        </div>
        <button class='shop-delete' onclick="shopPage.deleteItems(${cartItem.id})"><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8848 3.4H20.8667V5.1H18.874V16.15C18.874 16.3754 18.769 16.5916 18.5821 16.751C18.3953 16.9104 18.1418 17 17.8776 17H3.92813C3.66387 17 3.41044 16.9104 3.22358 16.751C3.03672 16.5916 2.93174 16.3754 2.93174 16.15V5.1H0.938965V3.4H5.92091V0.85C5.92091 0.624566 6.02589 0.408365 6.21275 0.248959C6.3996 0.0895533 6.65304 0 6.9173 0H14.8884C15.1527 0 15.4061 0.0895533 15.593 0.248959C15.7798 0.408365 15.8848 0.624566 15.8848 0.85V3.4ZM16.8812 5.1H4.92452V15.3H16.8812V5.1ZM12.3117 10.2L14.0734 11.7028L12.6645 12.9047L10.9029 11.4019L9.14124 12.9047L7.73234 11.7028L9.49396 10.2L7.73234 8.6972L9.14124 7.4953L10.9029 8.9981L12.6645 7.4953L14.0734 8.6972L12.3117 10.2ZM7.91369 1.7V3.4H13.892V1.7H7.91369Z" fill="#DF6464"/>
        </svg></button>
        <div>
      <button class='shop-btn__minus' onclick="shopPage.decreaseCount(${cartItem.id})">-</button>
      <span class='shop-value__counter'>${cartItem.count}</span>
      <button class='shop-btn__plus' onclick="shopPage.increaseCount(${cartItem.id})">+</button>
      </div>
      </li>
        `;
        summCatalog += price;
      }
    );

    CATALOG2.forEach(({id, name, price, img}) => {
      if(productsStore.indexOf(id) !== -1) {
        htmlCatalog2 += `
        <li class='cart-element'>
        <div class='cart-element__img'>
          <img src='${img}'/>
        </div>
        <div class='cart-element__info'>
          <span class='cart-element__name'>${name}</span> 
          <span class='cart-element__price'>${price} ₽</span>
        </div>
        <button class='shop-delete' onclick="shopPage.deleteItems(${id})"><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8848 3.4H20.8667V5.1H18.874V16.15C18.874 16.3754 18.769 16.5916 18.5821 16.751C18.3953 16.9104 18.1418 17 17.8776 17H3.92813C3.66387 17 3.41044 16.9104 3.22358 16.751C3.03672 16.5916 2.93174 16.3754 2.93174 16.15V5.1H0.938965V3.4H5.92091V0.85C5.92091 0.624566 6.02589 0.408365 6.21275 0.248959C6.3996 0.0895533 6.65304 0 6.9173 0H14.8884C15.1527 0 15.4061 0.0895533 15.593 0.248959C15.7798 0.408365 15.8848 0.624566 15.8848 0.85V3.4ZM16.8812 5.1H4.92452V15.3H16.8812V5.1ZM12.3117 10.2L14.0734 11.7028L12.6645 12.9047L10.9029 11.4019L9.14124 12.9047L7.73234 11.7028L9.49396 10.2L7.73234 8.6972L9.14124 7.4953L10.9029 8.9981L12.6645 7.4953L14.0734 8.6972L12.3117 10.2ZM7.91369 1.7V3.4H13.892V1.7H7.91369Z" fill="#DF6464"/>
        </svg></button>
        <button class='shop-btn__minus' onclick='decreaseCount'>-</button>
      <span class='shop-value__counter'>${count}</span>
      <button class='shop-plus' onclick='increaseCount'>+</button>
      </li>
        `;
        summCatalog += price;
      }
    })

    const Carthtml = `
    <h1 class='cart-title'>Корзина</h1>
    <div class='shop-container'>
    ${htmlCatalog}
    ${htmlCatalog2}
    <span class='cart-element__name'>ИТОГО</span> 
    <span class='cart-element__summ'>${summCatalog} ₽</span>

    </div>
    `;
    ROOT_SHOP.innerHTML = Carthtml;
  }
  // cartItem = localStorageUtil.putProducts().map((el) => {
  //   if(pushProducts) {
  //     return el
  //   }
  //   shopPage.render()
  // });
}


const shopPage = new Shop();
shopPage.render();