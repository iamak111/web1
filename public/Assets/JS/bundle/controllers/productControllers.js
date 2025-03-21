import axios from "axios";

export const addToWishlist = async (id) => {
  try {
    await axios({
      method: "POST",
      url: `/api/v1/user/wishlist/${id}`,
    }).then((res) => {
      if (res.data.status === "Success") {
        return alert("Product added your wishlist.");
      }
    });
  } catch (err) {
    if (err?.response?.data?.message) {
      return alert(err.response.data.message);
    } else return alert("Somthing went wrong. Please try again.");
  }
};

export const moveCartToCart = async (id, id2) => {
  try {
    await axios({
      method: "DELETE",
      url: `/api/v1/user/wishlist/${id}`,
    }).then(async (res) => {
      if (res.data.status === "Success") {
        await axios({
          method: "POST",
          url: `/api/v1/user/cart/${id2}`,
        }).then((res) => {
          if (res.data.status === "Success") {
            alert("Product Successfully moved to cart.");
            location.reload();
          }
        });
      }
    });
  } catch (err) {
    if (err?.response?.data?.message) {
      return alert(err.response.data.message);
    } else return alert("Somthing went wrong. Please try again.");
  }
};

export const addToCart = async (id, data) => {
  try {
    await axios({
      method: "POST",
      url: `/api/v1/user/cart/${id}`,
      data,
    }).then((res) => {
      if (res.data.status === "Success") {
        alert("Product added your cart.");
        return location.reload();
      }
    });
  } catch (err) {
    if (err?.response?.data?.message) {
      return alert(err.response.data.message);
    } else return alert("Somthing went wrong. Please try again.");
  }
};

export const buyProduct = async (data) => {
  try {
    await axios({
      method: "POST",
      url: `/api/v1/user/product/assign-order`,
      data,
    }).then((res) => {
      if (res.data.status === "Success") {
        return location.assign("/order/checkout");
      }
    });
  } catch (err) {
    if (err?.response?.data?.message) {
      return alert(err.response.data.message);
    } else return alert("Somthing went wrong. Please try again.");
  }
};

const setSizeDetails = (vals) => {
  const size_selection = document.getElementById("size_selection");
  size_selection.addEventListener("change", (e) => {
    vals.map((el) => {
      if (el.ecmpssId === e.target.value) {
        const pri_html = el.discountPrice
          ? `
            <span>Rs. ${el.discountPrice}</span>
            <span class="text-decoration-line-through text-secondary fw-normal fs-6">Rs.${
              el.price
            }</span>
            <span class="main-light fs-6"> (${Math.floor(
              ((el.price - el.discountPrice) / el.price) * 100
            )}% OFF)</span>
            `
          : ` <span>Rs. ${el.price}</span>`;
        const htmls = document.getElementById("price_details");
        htmls.replaceChildren();
        htmls.insertAdjacentHTML("beforeend", pri_html);
      }
    });
  });
};

const addEventForImg = (a, b) => {
  [...document.querySelectorAll(".sld_gallry")].map((el) => {
    el.addEventListener("click", (e) => {
      a.setAttribute("href", e.target.dataset.img);
      b.src = e.target.dataset.img;
    });
  });
};

export const getAdditionalDetails = async (id, data) => {
  try {
    await axios({
      method: "POST",
      url: `/api/v1/product/additional-details/${id}`,
      data,
    }).then((res) => {
      const main_img_link = document.querySelector(".main_img_link");
      const main_img_src = document.querySelector(".main_img_src");
      if (res.data.status === "Success") {
        const vals = res.data.docs;
        if (vals.type === "colorOnly") {
          const img_manipulation = document.querySelector(".img_manipulation");
          img_manipulation.replaceChildren();
          const sub_img_gallary_html = vals.imageGallery
            .map((el) => {
              return `<div class="col-3 h-20 sld_gallry" data-img=${el}><img class="img-fluid small-img" src="${el}" data-img=${el}></div>`;
            })
            .join("");

          img_manipulation.insertAdjacentHTML(
            "beforeend",
            sub_img_gallary_html
          );
          main_img_link.setAttribute("href", vals.imageGallery[0]);
          main_img_src.src = vals.imageGallery[0];

          const pri_html = vals.subDetails[0].discountPrice
            ? `
                <span>Rs. ${vals.subDetails[0].discountPrice}</span>
                <span class="text-decoration-line-through text-secondary fw-normal fs-6">Rs.${
                  vals.subDetails[0].price
                }</span>
                <span class="main-light fs-6"> (${Math.floor(
                  ((vals.subDetails[0].price -
                    vals.subDetails[0].discountPrice) /
                    vals.subDetails[0].price) *
                    100
                )}% OFF)</span>
                `
            : ` <span>Rs. ${vals.subDetails[0].price}</span>`;
          const price_details = document.getElementById("price_details");
          price_details.replaceChildren();
          price_details.insertAdjacentHTML("beforeend", pri_html);

          return addEventForImg(main_img_link, main_img_src);
        } else if (vals.type === "colorWithSize") {
          const img_manipulation = document.querySelector(".img_manipulation");
          img_manipulation.replaceChildren();
          const sub_img_gallary_html = vals.imageGallery
            .map((el) => {
              return `<div class="col-3 h-20 sld_gallry" data-img=${el}><img class="img-fluid small-img" src="${el}" data-img=${el}></div>`;
            })
            .join("");

          img_manipulation.insertAdjacentHTML(
            "beforeend",
            sub_img_gallary_html
          );
          main_img_link.setAttribute("href", vals.imageGallery[0]);
          main_img_src.src = vals.imageGallery[0];

          const size_selection = document.getElementById("size_selection");
          size_selection.replaceChildren();
          const price_details = document.getElementById("price_details");
          const size_html = vals.subDetails
            .map((el, i) => {
              if (i === 0) {
                const pri_html = el.discountPrice
                  ? `
                            <span>Rs. ${el.discountPrice}</span>
                            <span class="text-decoration-line-through text-secondary fw-normal fs-6">Rs.${
                              el.price
                            }</span>
                            <span class="main-light fs-6"> (${Math.floor(
                              ((el.price - el.discountPrice) / el.price) * 100
                            )}% OFF)</span>
                            `
                  : ` <span>Rs. ${el.price}</span>`;
                price_details.replaceChildren();
                price_details.insertAdjacentHTML("beforeend", pri_html);
                return `<option value=${el.ecmpssId} selected>${el.size}</option>`;
              } else {
                return `<option value=${el.ecmpssId} >${el.size}</option>`;
              }
            })
            .join("");
          size_selection.insertAdjacentHTML("beforeend", size_html);

          addEventForImg(main_img_link, main_img_src);
          return setSizeDetails(vals.subDetails);
        }
      }
    });
  } catch (err) {
    console.log(err);
    if (err?.response?.data?.message) {
      return alert(err.response.data.message);
    } else return alert("Somthing went wrong. Please try again.");
  }
};
