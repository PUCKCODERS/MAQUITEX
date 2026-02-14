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
        <div className="absolute top-[55px] left-0 w-full bg-white/30 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-xl z-[1000] overflow-hidden border border-white/40 max-h-[450px] overflow-y-auto scrollbar-hide">
          <div className="px-4 py-2 text-[10px] font-bold text-white uppercase tracking-wider bg-[#082c55]/60 border-b border-white/30">
            Productos Sugeridos
          </div>
          {suggestions.map((item, index) => (
            <Link
              to={`/product/${item._id}`}
              key={index}
              onClick={handleSuggestionClick}
              className="flex items-start gap-4 px-4 py-3 hover:bg-white/50 transition-all duration-200 border-b border-gray-100/30 last:border-0 no-underline group"
            >
              <div className="w-[60px] h-[60px] min-w-[60px] overflow-hidden rounded-lg border border-gray-200/60 bg-white p-1 flex items-center justify-center group-hover:border-[#082c55]/50 transition-colors">
                <img
                  src={
                    item.images?.[0] ||
                    item.image ||
                    "https://via.placeholder.com/50"
                  }
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center min-h-[60px]">
                <h4 className="text-[14px] font-semibold text-[#1f2937] line-clamp-1 group-hover:text-[#274a72] transition-colors mb-1 leading-tight">
                  {item.name}
                </h4>
                <span className="text-[11px] text-gray-400 line-clamp-1 mb-1 flex items-center gap-1">
                  {[
                    item.category?.name,
                    item.subCat?.name,
                    item.thirdLevelCat?.name,
                  ]
                    .filter(Boolean)
                    .join(" › ")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#e73821]">
                    ${item.price}
                  </span>
                  {item.oldPrice && (
                    <span className="text-[11px] text-gray-400 line-through decoration-gray-300">
                      ${item.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          <div
            className="p-3 text-center bg-white/30 backdrop-blur-xl border-t border-white/30 cursor-pointer hover:bg-white/50 transition-all sticky bottom-0 z-10"
            onClick={search}
          >
            <span className="text-[12px] font-bold text-[#274a72] hover:text-[#e73821] transition-colors uppercase tracking-wide flex items-center justify-center gap-2">
              VER TODOS LOS RESULTADOS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
