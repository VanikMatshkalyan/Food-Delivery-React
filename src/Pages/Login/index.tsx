import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import avatar1 from "../../assets/images/login-images/avatar1.png";
import avatar2 from "../../assets/images/login-images/avatar2.png";
import img from "../../assets/images/login-images/img.png";
import img1 from "../../assets/images/login-images/img1.png";
import plus from "../../assets/images/login-images/plus.png";
import data from "../../Data/users.json";
import { mainContext } from "../../context/main";

const validEmailRegex =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const validateForm = (errors: { email: string; password: string }): boolean => {
  let valid = true;
  const errorValues: string[] = Object.values(errors);
  errorValues.forEach((val) => {
    if (val.length > 0) {
      valid = false;
    }
  });
  return valid;
};

function Login(): JSX.Element {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { setLoggedUserData } = useContext(mainContext);

  const navigate = useNavigate();

  const handleLogin = (): void => {
    if (!loginInfo.email) {
      setErrors({ ...errors, email: "Required" });
      return;
    }
    if (!loginInfo.password) {
      setErrors({ ...errors, password: "Required" });
      return;
    }
    if (!validateForm(errors)) {
      return;
    }
    const userLogin = data.find(
      (item) => item.email?.toLowerCase() === loginInfo.email?.toLowerCase()
    );
    const userPassword = data.find(
      (item) => item.password === loginInfo.password
    );

    if (userLogin && userPassword) {
      setLoggedUserData(userLogin);
      navigate(`/settings/${userLogin.id}`);
    } else {
      setErrors({ ...errors, password: "Email or Password is incorrect" });
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    switch (name) {
      case "email":
        const errorMessageEmail = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        setErrors({
          ...errors,
          email: errorMessageEmail,
        });
        break;
      case "password":
        const errorMessagePassword =
          value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        setErrors({
          ...errors,
          password: errorMessagePassword,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <section className={styles.section_wrapper}>
        <div className={styles.login_section}>
          <p className={styles.title}>Food</p>
          <p className={styles.desc}>delivery</p>
          <div className={styles.login_area}>
            <p className={styles.login}>Login</p>
            <p className={styles.sign_area}>
              Sign in with your data that you entered during your registration.
            </p>
            <form>
              <div className={styles.email_area}>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  value={loginInfo.email}
                  onChange={handleChange}
                />
                <p className={styles.form}>{errors.email}</p>
              </div>
              <div className={styles.password_area}>
                <label htmlFor="email">Password:</label>
                <br />
                <input
                  name="password"
                  type="password"
                  placeholder="min. 8 characters"
                  minLength={8}
                  value={loginInfo.password}
                  onChange={handleChange}
                />
                <p className={styles.form}>{errors.password}</p>
              </div>
            </form>
            <input
              className="checkbox"
              type="checkbox"
              id="keepme"
              name="keepme"
              value="keep"
            />
            <label className={styles.keep}>Keep me logged in</label>
            <div className={styles.btn_area}>
              <button onClick={handleLogin} type="submit">
                <p>Login</p>
              </button>
            </div>
            <p className={styles.forgot}>Forgot password</p>
            <p className={styles.sign_up}>
              <p className={styles.first}> Don’t have an account?</p>
              <p><b>Sign up</b></p>
            </p>
          </div>
        </div>
        <div className={styles.cards_area}>
          <div className={styles.first_cards}>
            <div className={styles.overal_area}>
              <div className={styles.raiting_area}>
                <div className={styles.votes_area}>
                  <p className={styles.title}>Overall rating</p>
                  <div className={styles.star_area}>
                    <p className={styles.desc}>4.2</p>
                    <span className={`fa fa-star ${styles.checked}`} />
                    <span className={`fa fa-star ${styles.checked}`} />
                    <span className={`fa fa-star ${styles.checked}`} />
                    <span className={`fa fa-star ${styles.checked}`} />
                    <span className={`fa fa-star ${styles.unchecked}`} />
                    <span className={styles.desc2}>3 votes</span>
                  </div>
                </div>
                <div className={styles.leave_area}>
                  <span>Leave review</span>
                </div>
              </div>
              <span className={styles.sort_area}>
                Sort by:
                <b>Newest first</b>
                <i className="fa fa-angle-down" aria-hidden="true" />
              </span>
              <div className={styles.people_area}>
                <div className={styles.people}>
                  <img src={avatar1} alt="avatar1" />
                </div>
                <div className={styles.about_area}>
                  <p className={styles.title}>Savannah Miles</p>
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={styles.desc2}>10 days ago</span>
                  <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, adhuc nulla definiebas mei ad,
                    ei doming aperiam delicata est.
                  </p>
                </div>
              </div>
              <hr />
              <div className={styles.people_area2}>
                <div className={styles.people}>
                  <img src={avatar2} alt="avatar2" />
                </div>
                <div className={styles.about_area}>
                  <p className={styles.title}>Jacob Jones</p>
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.checked}`} />
                  <span className={`fa fa-star ${styles.unchecked}`} />
                  <span className={styles.desc2}>1 days ago</span>
                  <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, adhuc nulla definiebas mei ad,
                    ei doming aperiam delicata est.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rol_area}>
              <img src={img} alt="rol set" />
              <div className={styles.container}>
                <div className={styles.title_wrapper}>
                  <p className={styles.title}>Roll set</p>
                  <p className={styles.desc}>
                    Ea his sensibus eleifend, mollis iudicabit omittantur id
                    mel. Et cum ignota euismod corpora, et saepe.
                  </p>
                </div>
                <div className={styles.price_area}>
                  <p className={styles.price}>$ 22.56</p>
                  <span className={styles.txt}>
                    <b>+</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.nigiri_area}>
            <div className={styles.nigiri_wrapper}>
              <div className={styles.image_area}>
                <img src={img1} alt="nigiri set" />
              </div>
              <div className={styles.set_wrapper}>
                <div className={styles.set_area}>
                  <p className={styles.title}>Nigiri set</p>
                  <p className={styles.desc}>
                    Ea his sensibus eleifend, mollis iudicabit omittantur id
                    mel. Et cum ignota euismod corpora, et saepe.
                  </p>
                  <p className={styles.price}>$ 16.80</p>
                </div>
                <div className={styles.card_buttons_area}>
                  <div className={styles.span_area}>
                    <div className={styles.first}>
                      <span>-</span>
                    </div>
                    <div className={styles.first}>
                      <span>1</span>
                    </div>
                    <div className={styles.first}>
                      <span>+</span>
                    </div>
                  </div>
                  <button type="button" className={styles.add_to_card_btn}>
                    <img src={plus} alt="Plus" />
                    <p>Add to card</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.first_p}>Leave reviews for all meals</p>
          <p className={styles.second_p}>
            Lorem ipsum dolor sit amet, magna scaevola his ei. Cum te paulo
            probatus molestiae, eirmod assentior eum ne, et omnis antiopam mel.
          </p>
          <div className={styles.circle_area}>
            <span className={`${styles.dot} ${styles.color_span} ${styles.left}`} />
            <span className={`${styles.dot} ${styles.left}`} />
            <span className={`${styles.dot} ${styles.color_span} ${styles.left}`} />
            <span className={`${styles.dot} ${styles.color_span}`} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
