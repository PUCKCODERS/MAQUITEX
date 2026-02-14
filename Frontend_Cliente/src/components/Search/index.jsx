import React, { useEffect, useState, useContext } from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { FcSearch } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const context = useContext(MyContext);

  const history = useNavigate();

  // Efecto para el autocompletado (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        const obj = {
          page: 1,
          limit: 5, // Traemos 5 sugerencias
          query: searchQuery,
        };
        postData(`/api/product/search/get`, obj).then((res) => {
          if (res && res.products) {
            setSuggestions(res.products);
            setShowSuggestions(true);
          }
        });
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Espera 500ms después de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const search = () => {
    if (searchQuery !== "") {
      setIsLoading(true);
      const obj = {
        page: 1,
        limit: 10,
        query: searchQuery,
      };
      postData(`/api/product/search/get`, obj).then((res) => {
        context?.setSearchData(res);
        setTimeout(() => {
          setIsLoading(false);
          context?.setOpenSearchPanel(false);
          setShowSuggestions(false); // Ocultar sugerencias al buscar
          history("/search");
        }, 1000);
      });
    }
  };

  const handleSuggestionClick = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    context?.setOpenSearchPanel(false);
  };

  return (
    <div className="searchBox !w-[100%] !h-[50px] bg-[#e5e5e5] !rounded-[5px] shadow-[5px_5px_3px_#274a72] !relative !p-2">
      <input
        type="text"
        placeholder="BUSCAR PRODUCTO . . . . "
        className="!w-full !h-[35px] focus:outline-none !bg-inherit !p-2 !text-[15px] !text-[#082c55] !font-[500]"
        value={searchQuery}
        onChange={onChangeInput}
        onBlur={() => {
          // Pequeño delay para permitir el click en el enlace antes de cerrar
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        onFocus={() => {
          if (searchQuery.length > 2 && suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
      />
      <Button
        className="!absolute !top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
        onClick={search}
      >
        {isLoading === true ? (
          <CircularProgress />
        ) : (
          <FcSearch className="!text-[#082c55] !text-[25px]" />
        )}
      </Button>

      {/* Panel de Sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-[55px] left-0 w-full bg-white shadow-[0px_5px_15px_rgba(0,0,0,0.2)] rounded-b-md z-[100] overflow-hidden border border-gray-200 max-h-[300px] overflow-y-auto">
          {suggestions.map((item, index) => (
            <Link
              to={`/product/${item._id}`}
              key={index}
              onClick={handleSuggestionClick}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 transition-all border-b border-gray-100 last:border-0 text-decoration-none"
            >
              <div className="w-[40px] h-[40px] min-w-[40px] overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.images?.[0] || item.image} // Maneja array de imagenes o string simple
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[12px] font-bold text-[#082c55] line-clamp-1">
                  {item.name}
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500">
                    {item.category?.name || "Producto"}
                  </span>
                  <span className="text-[11px] font-bold text-[#e73821]">
                    ${item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div
            className="p-2 text-center bg-gray-50 cursor-pointer hover:bg-gray-200 transition-all"
            onClick={search}
          >
            <span className="text-[11px] font-bold text-[#274a72]">
              VER TODOS LOS RESULTADOS
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
