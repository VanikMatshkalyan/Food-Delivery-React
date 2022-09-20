/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlinePassword } from "react-icons/md";
import { BiCreditCard } from "react-icons/bi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import styles from "./settings.module.css";
import map from "../../assets/images/home-images/map.png";
import Header from "../../components/Header/Header";
import data from "../../Data/users.json";
import { mainContext } from "../../context/main";

interface IFormFields {
  firstName: string;
  email: string;
  lastName: string;
  phoneNumber: number | string;
  newDeals: boolean;
  newsLetter: boolean;
  newRestaurants: boolean;
  orderStatuses: boolean;
  specialOffers: boolean;
  passwordChanges: boolean;
  picture: string;
}

const defaultValues = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  newDeals: false,
  newRestaurants: false,
  newsLetter: false,
  orderStatuses: false,
  password: "",
  passwordChanges: false,
  phoneNumber: "",
  picture: "",
  specialOffers: false,
};

function Settings(): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [formFields, setFormFields] = useState<IFormFields | any>(
    defaultValues
  );
  const [image, setImage] = useState<null | any>(null);
  const { id } = useParams();
  const fileInputRef = useRef<any>();
  const { loggedUserData, setLoggedUserData } = useContext(mainContext);

  const navigate = useNavigate();

  const userData = useMemo(() => {
    if (id) {
      const findedData = data.find((item) => item.id === parseInt(id));
      return findedData;
    }
    return null;
  }, [id]);

  useEffect(() => {
    if (loggedUserData) {
      setFormFields(loggedUserData);
    } else {
      setFormFields(userData);
    }
  }, []);

  const handleClick = (num: number): void => {
    setActiveTab(num);
  };
  const triggerFileUpload = (): void => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentFile = event.target.files;

    if (currentFile) {
      const imageData = URL.createObjectURL(currentFile[0]);
      setImage(imageData);
    }
  };

  const handleFormFieldsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value, type, checked } = event.target;

    setFormFields({
      ...formFields,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDiscardChanges = (): void => {
    setFormFields(userData);
    setLoggedUserData(userData);
  };

  const handleRemove = (): void => {
    setImage(null);
  };

  const handleSaveChanges = (): void => {
    setLoggedUserData({
      ...formFields,
      picture: image || formFields?.picture,
    });
  };

  const handleLogout = (): void => {
    setLoggedUserData(null);
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className={styles.setting_account_section}>
        <div className={styles.settings_section}>
          <p className={styles.settings}>SETTINGS</p>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.wrapper_area} ${
              activeTab === 1 ? styles.active : ""
            }`}
            onClick={() => handleClick(1)}
          >
            <div className={styles.img_area}>
              <i className="fas fa-user-tie fa-2x" />
            </div>
            <div className={styles.text_area}>
              <p className={styles.title}>Account</p>
              <p className={styles.desc}>Personal information</p>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.wrapper_area} ${
              activeTab === 2 ? styles.active : ""
            }`}
            onClick={() => handleClick(2)}
          >
            <div className={styles.img_area}>
              <i className="fas fa-map-marker-alt fa-2x" />
            </div>
            <div className={styles.text_area}>
              <p className={styles.title}>Address</p>
              <p className={styles.desc}>Shippings addresses</p>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.wrapper_area} ${
              activeTab === 3 ? styles.active : ""
            }`}
            onClick={() => handleClick(3)}
          >
            <div className={styles.img_area}>
              <BiCreditCard className={styles.card} />
            </div>
            <div className={styles.text_area}>
              <p className={styles.title}>Payment method</p>
              <p className={styles.desc}>Connected credit cards</p>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`${styles.wrapper_area} ${
              activeTab === 4 ? styles.active : ""
            }`}
            onClick={() => handleClick(4)}
          >
            <div className={styles.img_area}>
              <AiOutlineSecurityScan className={styles.card} />
            </div>
            <div className={styles.text_area}>
              <p className={styles.title}>Security</p>
              <p className={styles.desc}>Password, 2FA</p>
            </div>
          </div>
        </div>
        {activeTab === 1 ? (
          <div className={styles.account_section}>
            <p className={styles.settings}>Account</p>
            <p>Personal information</p>
            <div className={styles.img_area}>
              <img
                className={styles.avatar}
                src={image || loggedUserData?.picture}
                alt="avatar"
              />
              <button onClick={triggerFileUpload} className={styles.title}>
                Change
              </button>
              <button
                disabled={!image}
                className={styles.desc}
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
            <form action={styles.input_area}>
              <div className={styles.input_area}>
                <div style={{ display: "none" }}>
                  <input
                    type="file"
                    accept="image/*"
                    key={Date.now()}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className={styles.inputs}>
                  <p>First name</p>
                  <input
                    className={styles.input_title}
                    type="text"
                    name="firstName"
                    value={formFields?.firstName}
                    onChange={handleFormFieldsChange}
                  />
                  <p>Email</p>
                  <input
                    type="text"
                    name={styles.email}
                    value={formFields?.email}
                    onChange={handleFormFieldsChange}
                  />
                </div>
                <div className={styles.inputs}>
                  <p>Last name</p>
                  <input
                    className={styles.input_title}
                    type="text"
                    name="lastName"
                    value={formFields?.lastName}
                    onChange={handleFormFieldsChange}
                  />
                  <p>Phone number</p>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formFields?.phoneNumber}
                    onChange={handleFormFieldsChange}
                  />
                </div>
              </div>
            </form>
            <p className={styles.email}>Email notifications</p>
            <div className={styles.checkbox_area}>
              <div className={styles.left_checkbox}>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.newDeals}
                    name="newDeals"
                    onChange={handleFormFieldsChange}
                  />
                  <label>New deals</label>
                </div>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.newRestaurants}
                    name="newRestaurants"
                    onChange={handleFormFieldsChange}
                  />
                  <label>New restaurants</label>
                </div>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.orderStatuses}
                    name="orderStatuses"
                    onChange={handleFormFieldsChange}
                  />
                  <label>Order statuses</label>
                </div>
              </div>
              <div className={styles.right_checkbox}>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.passwordChanges}
                    name="passwordChanges"
                    onChange={handleFormFieldsChange}
                  />
                  <label>Password changes</label>
                </div>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.specialOffers}
                    name="specialOffers"
                    onChange={handleFormFieldsChange}
                  />
                  <label>Special offers</label>
                </div>
                <div>
                  <input
                    id={styles.cb1}
                    type="checkbox"
                    checked={formFields?.newsLetter}
                    name="newsLetter"
                    onChange={handleFormFieldsChange}
                  />
                  <label>Newsletter</label>
                </div>
              </div>
            </div>
            <hr />
            <button
              onClick={handleLogout}
              className={`${styles.first_button} ${styles.logout}}`}
            >
              Log out
            </button>
            <button
              className={styles.second_button}
              onClick={handleDiscardChanges}
            >
              Discard changes
            </button>
            <button className={styles.third_button} onClick={handleSaveChanges}>
              Save changes
            </button>
          </div>
        ) : activeTab === 2 ? (
          <div className={styles.account_section}>
            <p className={styles.payment_title}>Address</p>
            <br />
            <p className={styles.payment_title}>Shippings addresses</p>
            <div className={styles.image}>
              <img src={map} alt="map" />
            </div>
          </div>
        ) : activeTab === 3 ? (
          <div className={styles.account_section}>
            <p className={styles.payment_title}>Payment method</p>
            <br />
            <p className={styles.payment_title}>Connected credit cards</p>
            <div className={styles.pay}>
              <form>
                <label>
                  <span className={styles.nmoncd}>Name on Card</span>
                  <input
                    value=""
                    name={styles.nameoncard}
                    type="text"
                    placeholder="Lucious B. Byinshtuff"
                  />
                </label>
                <label>
                  <span className={styles.cdnum}>
                    Card Number
                    <span>(Dashes not required)</span>
                  </span>
                  <input
                    value=""
                    name={styles.cardnumber}
                    type="text"
                    placeholder="DONT-USEA-REAL-NMBR"
                  />
                </label>
                <label className={styles.exp}>
                  <span className={styles.expdt}>Exp. Date</span>
                  <input
                    value=""
                    name="experationdate"
                    type="text"
                    placeholder="MM/YYYY"
                  />
                </label>
                <label className={styles.cvv}>
                  <span className={styles.cvvnum}>CVV</span>
                  <input
                    value=""
                    name={styles.cvvnumber}
                    type="text"
                    placeholder="XXX"
                  />
                </label>
                <button type="submit">Buy Now</button>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.account_section}>
            <p className={styles.payment_title}>Security</p>
            <br />
            <p className={styles.payment_title}> Password, 2FA</p>
            <div className={styles.password}>
              <p className={styles.password_title}>
                If you forgot password click there
              </p>
              <MdOutlinePassword
                className={styles.password_desc}
                onClick={handleLogout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
