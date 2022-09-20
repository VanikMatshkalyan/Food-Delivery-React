import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import styles from "./header.module.css";
import { mainContext } from "../../context/main";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const {
    loggedUserData,
    basketCount,
    setBasketCount,
    addedFoods,
    setAddedFoods,
    setProductsList,
    productsList,
  } = useContext(mainContext);
  let [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    navigate(`/settings/${loggedUserData?.id}`);
  };

  const handleDiscount = (item: any): void => {
    setBasketCount(basketCount - 1);
    const updatedList = addedFoods.map((i: any) => {
      if (i.id === item.id) {
        return {
          ...i,
          count: i.count - 1,
        };
      }
      return i;
    });
    setProductsList(
      productsList.map((i: any) => {
        if (i.id === item.id) {
          return {
            ...i,
            count: i.count - 1,
          };
        }
          return i;
      })
    );
    const filteredList = addedFoods.filter((i: any) => i.id !== item.id);
    if (item.count > 1) {
      setAddedFoods(updatedList);
    } else {
      setAddedFoods(filteredList);
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <div className={styles.delivery}>
              <Link to="/Home" className={styles.link}>
                <p className={styles.title}>Food</p>
                <p className={styles.desc}>delivery</p>
              </Link>
              <li className={styles.input_area}>
                <input type="text" placeholder="   Search" />
                <i className="fa fa-search" aria-hidden="true" />
              </li>
            </div>
            <div className={styles.about}>
              <li>
                <Link to="/home">Restaurants</Link>
              </li>
              <li>
                <a className={styles.deals} href="#">
                  Deals
                </a>
              </li>
              <li>
                <a href="#">My orders</a>
              </li>
              <li>
                <a href="#">Company</a>
              </li>
              <li>
                <div className={styles.seen_area}>
                  <FaShoppingBag
                    className={`${styles.shop_card_button} ${
                      cartOpen && styles.active
                    }`}
                    onClick={() => setCartOpen((cartOpen = !cartOpen))}
                  />
                  {basketCount ? <p>{basketCount}</p> : null}
                  {cartOpen && (
                    <div className={styles.shop_cart}>
                      {addedFoods.length > 0 ? (
                        <>
                          {addedFoods.map((item: any) => {
                            return (
                              <div className={styles.style} key={item.id}>
                                <img
                                  className={styles.added_foods}
                                  src={item.path}
                                  alt={item.name}
                                />
                                <div className={styles.name_style_area}>
                                  <div className={styles.desc2}>
                                    {item.name}
                                  </div>
                                  {item.count > 0 && (
                                    <button
                                      className={styles.disCountBtn}
                                      onClick={() => handleDiscount(item)}
                                    >
                                      -
                                    </button>
                                  )}
                                  <div>{item.count}</div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <p className={styles.emptyBasket}>Empty Basket</p>
                      )}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <img
                  className={styles.logo}
                  src={loggedUserData?.picture}
                  alt="Avatar"
                  onClick={handleClick}
                />
              </li>
              <li>
                <div className={styles.menu_icon}>
                  <span />
                </div>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
