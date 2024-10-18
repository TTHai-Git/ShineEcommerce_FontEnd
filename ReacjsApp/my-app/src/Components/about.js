import React from "react";
// import { mdiPhone, mdiArrowUp } from "@mdi/js";
// import Icon from "@mdi/react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import "../Template/shine/dist/css/main.min.css.map";

import banner_1 from "../Template/shine/dist/img/banner-1.png";

const About = () => (
  <main>
    <section className="main-section about-1">
      <div className="container">
        <h2 className="main-title">Giới thiệu</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Inventore, delectus ut. Nostrum aliquam voluptates, expedita
                impedit accusamus facere. Voluptatibus ratione temporibus
                inventore iusto et aut necessitatibus voluptas dolorem
                cupiditate dignissimos!
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Numquam, tempore reiciendis tenetur porro dolorem repellendus
                dicta. Perferendis, nemo explicabo recusandae aspernatur dolor
                debitis suscipit ratione porro animi vel voluptatum magni.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image">
              <img src={banner_1} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="main-section about-2">
      <div className="container">
        <h2 className="main-title">Tầm nhìn và sứ mệnh</h2>
        <div className="row">
          <div className="col-lg-6">
            <h3 className="main-child">Tầm nhìn</h3>
            <div className="content-wrapper">
              <div className="icon"></div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet consequuntur repellat tempore dolore, numquam sunt
                  quibusdam sapiente temporibus ut, commodi iste assumenda sequi
                  sed ad error vero sit hic a?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Perferendis nulla vero officiis qui dolore eum sunt, quam
                  vitae quia laboriosam reprehenderit ad veniam a consectetur
                  quos mollitia minima quas nemo?
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="main-child">Sứ mệnh</h3>
            <div className="content-wrapper">
              <div className="icon"></div>
              <div className="content">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem autem ut voluptate quaerat, dignissimos vero aspernatur
                  est ab nisi! Eius similique laudantium error exercitationem
                  aliquid iure quae? Eum, ipsa odit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta necessitatibus obcaecati tenetur animi, mollitia error
                  totam quaerat voluptates ullam, enim accusamus ea, tempora
                  placeat? Voluptatem ut esse illo ad repellendus?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <div id="phoneButton">
      <a href="#">
        <span className="ic">
          <Icon path={mdiPhone} size={1} />
        </span>
      </a>
    </div>

    <div id="backToTop">
      <Icon path={mdiArrowUp} size={1} />
    </div> */}
  </main>
);

export default About;
