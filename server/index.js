import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import SSLCommerzPayment from "sslcommerz-lts";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const store_id = "helpk6279f072f2e90";
const store_passwd = "helpk6279f072f2e90@ssl";
const is_live = false;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
const customer = {
  name: "Arif",
  email: "arif@example.com",
  code: 4000,
};

const transitionId = uuidv4();
app.post("/payment", (req, res) => {
  const orderDatails = req.body;

  const data = {
    total_amount: orderDatails.price,
    currency: "USD",
    tran_id: transitionId,
    success_url: `http://localhost:5000/success?transitionId=${transitionId}`,
    fail_url: "http://localhost:5000/fail",
    cancel_url: "http://localhost:5000/cancel",
    ipn_url: "http://localhost:5000/ipn",
    shipping_method: "Courier",
    product_name: orderDatails.name,
    product_category: "Electronic",
    product_profile: "general",
    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: customer.code,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).json(GatewayPageURL);
  });
});

app.post("/success", async (req, res) => {
  const { transitionId } = req.params;
  console.log(transitionId);
  res.redirect("http://localhost:3000");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running");
});
