import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/payment", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        window.location.assign(result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="w-50 mx-auto my-5 " onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleInputPassword1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default App;
