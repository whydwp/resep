/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Footer from "../../components/base/footer/footer";
import Navbars from "../../components/base/navbar/navbar";
import style from "./addreceiped.module.css";
import styles from "../../components/module/detailResep/style.module.css";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Login from "../../components/base/Login";
import Logout from "../../components/base/Logout";

const DetailReseps = ({ resep, isAuth }) => {
  const [title, setTitle] = useState("");
  const [idfood, setFood] = useState("");
  const [ingrediens, setIngrediens] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  console.log(idfood);
  // const data = new Date().toISOString().slice(0, 19).replace("T", " ");
  // console.log(data)
  useEffect(() => {
    setTitle(resep.title);
    setFood(resep.idfood);
    setIngrediens(resep.ingrediens.split(","));
    setImagePreview(resep.image);
  }, [resep]);
  return (
    <div>
      <Navbars
        classAdd={style.navNon}
        classHome={style.navActive}
        classProfil={style.navNon}
      >
        {isAuth && (
          <Logout></Logout>
        )}
        {!isAuth && (
          <Login></Login>
        )}
      </Navbars>
      <main className="mt-5">
        <div className="container slide">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center mt-5">{title}</h1>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  width={360}
                  height={200}
                  layout="responsive"
                  alt="Picture of the resep"
                  className={`${styles.imageCover} img img-responsive`}
                />
              )}
              <div className={`${styles.captionLogo}`}>
                <button className={`${styles.simpan} btn`}>
                  <img
                    src="/assets/simpan.png"
                    width="25px"
                    alt=""
                    className={styles.icon}
                  />
                </button>
                <button className={`${styles.tangan} btn ms-2`}>
                  <img
                    src="/assets/tangan.png"
                    width="30px"
                    alt=""
                    className={styles.icon}
                  />
                </button>
              </div>
            </div>
            <div className="col-lg-4  mt-5">
              <h4 className={`${styles.titleIng}`}>Ingredients</h4>
              <ul className={`${styles.ingrediens}`}>
                {!ingrediens ? (
                  <p>Loading...</p>
                ) : (
                  ingrediens.map((ingredient, idx) => {
                    return <li key={idx}>{ingredient}</li>;
                  })
                )}
              </ul>
            </div>
            <div className={`${styles.videoPlay} col-lg-12 `}>
              <h3 className={`${styles.videoStep}`}>Video Step</h3>
              <div className={`${styles.play}`}>
                <Link href={`/detail/${idfood}`}>
                  <button className={`${styles.play} btn btn-warning `}>
                    <img src="/assets/Vector.png" width="10px" alt="" />
                  </button>
                </Link>
              </div>
              <div className={`${styles.play}`}>
                <button className={`${styles.play} btn btn-warning `}>
                  <img src="/assets/Vector.png" width="10px" alt="" />
                </button>
              </div>
              <div className={`${styles.play}`}>
                <button className={`${styles.play} btn btn-warning `}>
                  <img src="/assets/Vector.png" width="10px" alt="" />
                </button>
              </div>
              <div className={`${styles.play}`}>
                <button className={`${styles.play} btn btn-warning `}>
                  <img src="/assets/Vector.png" width="10px" alt="" />
                </button>
              </div>
              <div className={`${styles.play}`}>
                <button className={`${styles.play} btn btn-warning `}>
                  <img src="/assets/Vector.png" width="10px" alt="" />
                </button>
              </div>
            </div>
            <div className="col-lg-12  mt-5">
              <div className="form-floating">
                <textarea
                  className={`${styles.coment} form-control`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                ></textarea>
                <label htmlFor="floatingTextarea2">Comments</label>
                <button className={`${styles.send} btn btn-warning `}>
                  Send
                </button>
              </div>
            </div>
            <div className="col-lg-1 ">
              <h5 className={`${styles.coments}`}>Comment</h5>
              <img
                className={`${styles.imgComent}`}
                src="/assets//Ellipse 128.png"
                alt=""
              />
            </div>
            <div className={`${styles.comen} col-lg-5 `}>
              <h5>Ayunda</h5>
              <p>Nice recipe. simple and delicious, thankyou</p>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    console.log(cookie);
    const recipeID = context.params.id;
    console.log(recipeID);
     let isAuth = false;

     if (cookie) {
       isAuth = true;
     }
    const { data: RespData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/food/${recipeID}`
    );
    console.log(RespData.data[0]);
    return {
      props: {
        isAuth:isAuth,
        resep: RespData.data[0],
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default DetailReseps;
