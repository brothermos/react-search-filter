import { useState, useEffect } from "react";
import "./App.css";

function App() {
   const [countries, setCountries] = useState([]);
   const [word, setWord] = useState("");

   // สร้าง state มาเพื่อกรองหาชื่อประเทศกับเมืองหลวง
   const [dataFilter] = useState(["name", "capital"]);

   // เรียกข้อมูลจาก API
   useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setCountries(data);
         });
   }, []);

   //ฟังก์ชั่นแปลงรูปแบบตัวเลขเป็นมี comma เช่น 1200 => 1,200
   const formatNumber = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
   };

   const searchCountries = (countries) => {
      return countries.filter((item) => {
         return dataFilter.some((filter) => {
            if (item[filter]) {
               if (filter === "name") {
                  return item[filter].common.toString().toLowerCase().indexOf(word.toLowerCase()) > -1;
               } else {
                  return item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) > -1;
               }
            }
         });
      });
   };
   return (
      <div className="container">
         <div className="search-container">
            <label htmlFor="search-form">
               <input
                  type="text"
                  className="search-input"
                  placeholder="ค้นหาข้อมูลประเทศ (เช่น Bangkok, Thailand)"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
               />
            </label>
         </div>
         <ul className="row">
            {searchCountries(countries).map((item, index) => {
               return (
                  <li key={index}>
                     <div className="card">
                        <div className="card-title">
                           <img src={item.flags.svg} alt={item.name.common} />
                        </div>
                        <div className="card-body">
                           <div className="card-description">
                              <h2>{item.name.common}</h2>
                              <ol className="card-list">
                                 <li>
                                    ประชากร : <span>{formatNumber(item.population)}</span>
                                 </li>
                                 <li>
                                    ภูมิภาค : <span>{item.region}</span>
                                 </li>
                                 <li>
                                    เมืองหลวง : <span>{item.capital}</span>
                                 </li>
                              </ol>
                           </div>
                        </div>
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
export default App;
