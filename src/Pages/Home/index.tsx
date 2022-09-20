import { useContext, useState } from "react";
import styles from "./home.module.css";
import cake from "../../assets/images/home-images/cake.png";
import burger from "../../assets/images/home-images/burger.png";
import Header from "../../components/Header/Header";
import data from "../../Data/food.json";
import product from "../../Data/products.json";
import { mainContext } from "../../context/main";

function Home(): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);
  const {
    setBasketCount,
    setAddedFoods,
    addedFoods,
    setProductsList,
    productsList,
  } = useContext(mainContext);

  const addToBasket = (id: number): void => {
    const newList = productsList.map((item: any) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setBasketCount((count: number) => count + 1);
    setProductsList(newList);
    const addedProduct = newList.find((item: any) => item.id === id);
    const selectedProduct: any = addedFoods.find((item: any) => item.id === id);
    if (selectedProduct?.id) {
      const updatedList = addedFoods.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      });
      setAddedFoods(updatedList);
      return;
    }
    setAddedFoods([...addedFoods, addedProduct]);
  };

  const handleClick = (num: number): void => {
    setActiveTab(num);
    const filteredList = product.filter((item) => {
      const selectedItem = item.category.find(
        (category) => category.id === num
      );

      if (selectedItem) {
        return item;
      }
      return null;
    });
    setProductsList(filteredList);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.col_6} ${styles.col_6_2}`}>
          <div className={styles.image_area}>
            <img src={cake} alt="Cake" />
            <div className={styles.image_items_area}>
              <p className={styles.title}>All deserts</p>
              <p className={styles.desc}>20% OFF</p>
              <p className={styles.desc2}>Deserty</p>
            </div>
          </div>
        </div>
        <div className={`${styles.col_6} ${styles.col_6_2}`}>
          <div className={`${styles.image_area} ${styles.left}`}>
            <img src={burger} alt="Burger" />
            <div className={styles.image_items_area}>
              <p className={styles.title}>Big Burgers</p>
              <p className={styles.desc}>50% OFF</p>
              <p className={styles.desc2}>Fooddies</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.iconsContainer}>
        <div className={styles.icons}>
          {data.slice(0, 3).map((item) => {
            return (
              <div
                role="button"
                tabIndex={0}
                className={`${styles.col4} ${
                  activeTab === Number(item.id) ? styles.active : ""
                }`}
                onClick={() => handleClick(Number(item.id))}
                key={item.id}
              >
                <div className={styles.mapArea}>
                  <img src={item.path} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.icons}>
          {data.slice(3, 6).map((item) => {
            return (
              <div
                role="button"
                tabIndex={0}
                className={`${styles.col4} ${
                  activeTab === Number(item.id) ? styles.active : ""
                }`}
                onClick={() => handleClick(Number(item.id))}
                key={item.id}
              >
                <div className={styles.mapArea}>
                  <img src={item.path} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.nerby}>Nearby restaurants</div>
      <section
        className={
          productsList.length <= 2 ? styles.productsList : styles.products
        }
      >
        {productsList.map((item: any) => {
          return (
            <div className={styles.img_area} key={item.id}>
              <img src={item.path} alt={item.name} />
              {item.featured ? (
                <p className={styles.feautered_area}>FEAUTERED</p>
              ) : null}
              <div className={styles.name_area}>
                <p>{item.name}</p>
                <div
                  className={styles.addToBasket}
                  onClick={() => addToBasket(Number(item.id))}
                >
                  <i className="fas fa-shopping-bag" />
                  {item.count ? (
                    <p className={styles.add_item}>{item.count}</p>
                  ) : null}
                </div>
              </div>
              <div className={styles.minute_area}>
                <p className={styles.title}>
                  <i className="fa fa-clock-o" aria-hidden="true" />
                  {item.deliveryTime}
                  <span />
                </p>
                <p className={styles.desc}>{item.price}</p>
              </div>
              <div className={styles.checked}>
                {item.category.map((category: any) => {
                  return (
                    <div className={styles.checked_foods} key={category.id}>
                      <img src={category.path} alt={category.name} />
                      <p>{category.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
