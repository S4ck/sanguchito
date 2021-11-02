import fetch from "isomorphic-unfetch";
import { nanoid } from "nanoid";

//fetcher
export const fetcher = (url) => fetch(url).then((r) => r.json());

export const getFormValidations = () => {
  return {
    //name
    name: {
      required: {
        value: true,
        message: "Name is required",
      },
      maxLength: {
        value: 20,
        message: "Max Length 20 chars",
      },
      minLength: {
        value: 4,
        message: "Min Length 4 chars",
      },
      pattern: {
        value: /^[A-Za-z ]{4,20}$/,
        message: "Incorrect Name",
      },
    },

    //phone
    phone: {
      required: {
        value: true,
        message: "Phone is required",
      },
      maxLength: {
        value: 10,
        message: "Max Length 10 chars",
      },
      minLength: {
        value: 7,
        message: "Min Length 7 chars",
      },
      pattern: {
        value: /^[0-9]{7,10}$/,
        message: "Icorrect Phone",
      },
    },
    //address
    address: {
      required: {
        value: true,
        message: "Address is required",
      },
      maxLength: {
        value: 30,
        message: "Max Length 30 chars",
      },
      minLength: {
        value: 4,
        message: "Min Length 4 chars",
      },
      pattern: {
        value: /^[0-9a-zA-Z ]{4,30}$/,
        message: "Icorrect Address",
      },
    },
    //city
    city: {
      required: {
        value: true,
        message: "City is required",
      },
    },
    //schedule
    schedule: {
      required: {
        value: true,
        message: "Schedule is required",
      },
    },
    //extra comment
    comment: {
      maxLength: {
        value: 25,
        message: "Max Length 25 chars",
      },
    },
  };
};

//wsp url creator
export function getWspUrl(orderData) {
  const N = process.env.NEXT_PUBLIC_MY_PHONE_NUMBER;
  const ID = nanoid(8);
  const { cartItems, subTotal, withDelivery, shippingCost, total, formData } = orderData;
  const { name, phone, address, city, schedule, comment } = formData;

  let cartListforUrl = "";

  {
    Object.values(cartItems).forEach((item) => {
      const itemTotal = (item.offerPrice ? item.offerPrice * item.qty : item.price * item.qty).toFixed(2);
      cartListforUrl += `%0A%0A - *(${item.qty})* ${item.title} --> _*S/${itemTotal}*_`;
    });
  }

  const WSP_URL = `https://api.whatsapp.com/send/?phone=${N}&text=%2A${"Orden"}%3A%2A%20${ID}%0A%0A%2A${"Cliente"}%3A%2A%20${name}%0A%0A%2A${"Teléfono"}%3A%2A%20${phone}%0A%0A%2A${
    withDelivery ? "Dirección" + "%3A%2A%20" + address + " %0A%0A%2A" : ""
  }${withDelivery ? "Ciudad" + "%3A%2A%20" + city + "%0A%0A%2A" : ""}${
    withDelivery ? "Horario" + "%3A%2A%20" + schedule + "%0A%0A%2A" : ""
  }${comment ? "Comentario" + "%3A%2A%20" + comment + "%0A%0A%2A" : ""}${"Lista de Pedido"}%3A%2A${cartListforUrl}%0A%0A%2A${
    withDelivery ? "Sub Total" + "%3A%2A%20S/" + subTotal + " %0A%0A%2A" : ""
  }${withDelivery ? "Fast Delivery" + "%3A%2A%20S/" + shippingCost + " %0A%0A%2A" : ""}${"Total"}%3A%2A%20S/${total}%0A%0A`;

  return WSP_URL;
}
