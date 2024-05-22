import { useState } from "react";
import { InputBox } from "./Components";
import backgroundImage from "./assets/coins.jpeg";
import goldImage from "./assets/gold.jpeg";

//import "./App.css";
import useCurrencyConverter from "./hooks/useCurrencyConverter";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convert, setConvert] = useState(0);
  const [btntxt, setBtnText] = useState("convert");
  const currencyConverter = useCurrencyConverter(from);
  const options = Object.keys(currencyConverter);

  const swapBtn = () => {
    setFrom(to);
    setTo(from);
    setConvert(amount);
    setAmount(convert);
  };

  const resultFetch = () => {
    setConvert(amount * currencyConverter[to]);
  };
  const convertBtn = () => {
    {
      setBtnText(convert);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        //backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-1/2 h-screen flex pl-5 justify-start items-center">
        <img src={goldImage} className="max-w-md h-auto" />
      </div>
      <div className="w-1/2 h-screen flex justify-end items-center">
        <div className="w-full max-w-md mr-5 border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resultFetch();
            }}
          >
            <div className="w-full h-40">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                currencyTypes={options}
                onCurrencyChange={(currency) => {
                  setAmount(amount);
                }}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5 flex justify-center items-center">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-8 border-2 border-white rounded-md bg-blue-600 text-white px-7 py-3"
                onClick={swapBtn}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convert}
                currencyTypes={options}
                onCurrencyChange={(currency) => {
                  setTo(currency);
                }}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              onClick={convertBtn}
            >
              {btntxt === "convert"
                ? btntxt
                : `Converting ${from.toUpperCase()} ${amount} to ${to.toUpperCase()} ${convert}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
