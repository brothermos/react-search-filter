import { useState, useEffect } from "react";
import "./App.css";
import mockData from "./MOCK_DATA.json";
function App() {
   const [search, setSearch] = useState("");

   // สร้าง state มาเพื่อกรองหาชื่อจริง นามสกุล ประเทศ​ อีเมล เพศ
   const [dataFilter] = useState(["first_name", "last_name", "country", "email", "gender"]);
   // search filter
   const searchCountries = (data) => {
      return data.filter((item) => {
         return dataFilter.some((filter) => {
            return item[filter].toString().toLowerCase().indexOf(search.toLowerCase()) > -1;
         });
      });
   };

   const clearFilter = () => {
      setSearch("");
      // setFilterCountry("");
      // setFilterGender("");
   };

   // button filter
   const btnFilter = (e) => {
      let btnWord = e.target.value;
      if (btnWord !== "Male") {
         setSearch(search(btnWord));
      }
   };

   return (
      <div className="container">
         <div className="search-container">
            <h2 className="title">Test</h2>
            <div className="menu-bar">
               <button className="button-filter" onClick={btnFilter}>
                  Male
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Female
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Bigender
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Non-birany
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Agender
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Polygender
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Genderfluid
               </button>
            </div>
            <div className="menu-bar">
               <button className="button-filter" onClick={btnFilter}>
                  Genderqueer
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Brazil
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Thailand
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Sweden
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Japan
               </button>
               <button className="button-filter" onClick={btnFilter}>
                  Netherlands
               </button>
            </div>

            {/* search bar */}
            <div>
               <label htmlFor="search-form">
                  <input
                     type="text"
                     className="search-input"
                     placeholder="ค้นหาข้อมูล (เช่น Thailand, Donny, Male)"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </label>
               <button className="text-cyan-500 uppercase" onClick={clearFilter}>
                  clear
               </button>
            </div>
         </div>

         {/* show content */}
         <ul className="row">
            {searchCountries(mockData).map((item, index) => {
               return (
                  <li key={index}>
                     <div className="card">
                        <div className="card-title">
                           <img src={item.image} alt="" />
                        </div>
                        <div className="card-body">
                           <div className="card-description">
                              <p>
                                 {item.first_name} {item.last_name}
                              </p>
                              <ol className="card-list">
                                 <li>
                                    <span>{item.gender}</span>
                                 </li>
                                 <li>
                                    <span>{item.email}</span>
                                 </li>
                                 <li>
                                    <span>{item.country}</span>
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
