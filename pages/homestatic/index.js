/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Navbars from "../../components/base/navbar/navbar";
import Footer from "../../components/base/footer/footer";
import style from "../../styles/addreceiped.module.css";
import styles from "../../components/module/homes/style.module.css";
import axios from "axios";
import Router from "next/router";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Home from "../../components/module/homes/homes";
import Content from "../../components/module/homes/content";
import Logout from "../../components/base/Logout";
import Login from "../../components/base/Login";

const Hom = ({ resep }) => {
  return (
    <div>
      <Navbars
        classAdd={style.navNon}
        classHome={style.navActive}
        classProfil={style.navNon}
      >
      </Navbars>
      <Home></Home>
      <div>
        <main className="mt-5">
          <div className="container mt-5">
            <div className="row  row-cols-2 row-cols-lg-3 align-items-center g-3 mt-2">
              {!resep ? (
                <h4>Loading...</h4>
              ) : (
                resep.map((reseps) => (
                  <div className="col " key={reseps.idfood}>
                    <div
                      className={`${styles.categories} card text-center d-flex `}
                    >
                      <Image
                        width="350px"
                        height="355px"
                        layout="responsive"
                        src={reseps.image}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-start align-items-end">
                        <Link href={`/detailResep/${reseps.idfood}`}>
                          <a className={`${styles.captionCard}`}>
                            {reseps.title}
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: RespData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/food`
  );
  console.log(RespData.data);
  return {
    props: {
      resep: RespData.data,
    },
  };
};
export default Hom;
