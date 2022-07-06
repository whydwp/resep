/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Footer from "../../components/base/footer/footer";
import Navbars from "../../components/base/navbar/navbar";
import Profils from "../../components/module/profil/profil";
import styles from "../../styles/addreceiped.module.css";
import axios from "axios";
import style from "../../components/module/profil/style.module.css";
import { useRouter } from "next/router";
import Card from "../../components/module/profil/card";
import Input from "../../components/base/input/input";
import Login from "../../components/base/Login";
import Logout from "../../components/base/Logout";
import Image from "next/image";
import Link from "next/link";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const Prof = ({ profil, cookie, img, isAuth, resepin }) => {
  const [resep, setResep] = useState([]);
  useEffect(() => {
    setResep(resepin);
  }, []);
  console.log(resep);

  const router = useRouter();

  const refreshData = () => {
    // router.replace(router.asPath);
    router.push("/profil");
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`, {
        withCredentials: true,
      });
      Swal.fire({
        icon: "success",
        title: "berhasil menghapus !! ",
      });
      refreshData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "gagal menghapus",
      });
      console.log(error);
    }
  };

  const [image, setImage] = useState([]);
  const route = useRouter();
  const [fullname, setFullname] = useState(profil.fullname);
  const [imagePreview, setImagePreview] = useState(
    img ||
      "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale"
  );
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("fullname", fullname);
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, formData, {
        "content-type": "multipart/form-data",
        withCredentials: true,
        headers: {
          cookie: cookie,
        },
      })
      .then((res) => {
        console.log(res);
        route.push("/profil");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate ",
          text: `Nama : ${fullname}`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data yang anda inputkan salah",
        });
        console.log(error);
      });
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbars
        classAdd={styles.navNon}
        classHome={styles.navNon}
        classProfil={styles.navActive}
      >
        {isAuth && <Logout></Logout>}
        {!isAuth && <Login></Login>}
      </Navbars>
      <div>
        <main className="mt-5">
          <div className="container slide">
            <div className="row">
              <div className="col-lg-12">
                <div className={`${style.profil}`}>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt=""
                      className={`${style.profilImage}`}
                    />
                  ) : (
                    <img
                      src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale"
                      alt=""
                      style={{ borderRadius: "50%" }}
                      className={`${style.profilImage} rounded`}
                    />
                  )}
                  <p className={`${style.textProfil} text-center `}>
                    {profil.fullname}
                  </p>
                  <p className={`${style.textProfil} text-center `}>
                    {profil.email}
                  </p>
                  <form
                    action=""
                    onSubmit={submit}
                    className={style.formupload}
                  >
                    <div className={`${style.selectAvatar} mt-2 text-center`}>
                      <input
                        type="file"
                        className="upload"
                        onChange={(e) => onImageUpload(e)}
                        id="upload"
                        hidden
                      />
                      <label className={`${style.uploads}`} htmlFor="upload">
                        Image Profil
                      </label>
                    </div>
                    <div className={`${style.formname} text-center mt-2`}>
                      <Input
                        type="text"
                        className={`${style.inputName} form-control`}
                        id="exampleFormControlInput1"
                        placeholder="name"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className={`${style.formbtn} text-center mt-2 mb-5`}>
                      <button type="submit" className="btn btn-secondary">
                        upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-12 mt-3">
                <ul className="list-group list-group-horizontal">
                  <li className={`${style.choase} list-group-item`}>
                    <a href="">My Recipe</a>
                  </li>
                  <li className={`${style.choase} list-group-item`}>
                    <a href="" className="text-secondary">
                      Saved Recipe
                    </a>
                  </li>
                  <li className={`${style.choase} list-group-item`}>
                    <a href="" className="text-secondary">
                      Liked Recipe
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${style.garis}`}></div>
              {resep.length <= 0 && (
                <div className={`${style.textProfil} text-center `}>
                  <h3 className={`${style.textProfil} text-center `}>
                    Anda belum mempunyai resep
                  </h3>
                </div>
              )}
              <div className="col-lg-12 mt-3">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 g-2">
                  {resep.length > 0 && resep.map((item) => (
                      <div className="col" key={item.idfood}>
                        <div className="card shadow-sm ms-1">
                          <Link href={`/Resepin/editReciped/${item.idfood}`}>
                            <a className={style.iconedit}>
                              {" "}
                              <BsFillPencilFill className={style.pen} />
                            </a>
                          </Link>
                          <Link href="/profil">
                            <a
                              onClick={() => deletePost(item.idfood)}
                              className={style.icondel}
                            >
                              <BsTrashFill className={style.del} />
                            </a>
                          </Link>
                          <Image
                            width="300px"
                            height="240px"
                            layout="responsive"
                            src={item.image}
                            className="image-fluid"
                            alt="..."
                          />
                          <h4 className={`${style.captionImage}`}>
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    // const token = context.req.headers.cookie;
    // console.log(cookie);
    // console.log(token.split("=")[1]);
    if (!cookie) {
      context.res.writeHead(302, {
        Location: `http://localhost:3000/login`,
      });
      return {};
    }
    let isAuth = false;

    if (cookie) {
      isAuth = true;
    }
    const { data: ProfilData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profil`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookie,
        },
      }
    );
    const iduser = ProfilData.data[0].iduser;
    const { data: dataResep } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/food/user/${iduser}`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookie,
        },
      }
    );
    const result = ProfilData.data[0];
    const images = ProfilData.data[0].image;
    // console.log(dataResep.data);
    return {
      props: {
        profil: result,
        img: images,
        cookie: cookie,
        isAuth: isAuth,
        resepin: dataResep.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default Prof;
