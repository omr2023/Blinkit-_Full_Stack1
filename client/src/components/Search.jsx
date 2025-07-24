    import React, { useEffect } from "react";
    import { useState } from "react";
    import { FaSearch } from "react-icons/fa";
    import { Link, useLocation, useNavigate } from "react-router-dom";
    import { TypeAnimation } from "react-type-animation";
    import { FaArrowLeft } from "react-icons/fa";
    import useMobile from "../hooks/useMobile";
    const Search = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const [isSearchPage, setIsSearchPage] = useState(false);
      const [isMobile] = useMobile();
        const params  = useLocation()
        const searchText = params.search ? params.search.slice(3) : "";
      useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
      }, [location]);

      const redirectToSearchPage = () => {
        navigate("/search");
      };

      const handleOnChange = (e) => {
        const value = e.target.value;

        const url = `/search?q=${value}`
        navigate(url);
      }

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[400px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      {isMobile && isSearchPage ? (
        <Link to={"/"} className="flex justify-center items-center h-full p-3 ml-1 text-neutral-400 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
          <FaArrowLeft size={20} />
        </Link>
      ) : (
        <button className="flex justify-center items-center h-full p-3 text-neutral-400 group-focus-within:text-primary-200">
          <FaSearch className="" size={22} />
        </button>
      )}

      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in Search page
          <div
            onClick={redirectToSearchPage}
            className=" text-gray-600 w-full h-full flex items-center "
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "suogar" ',
                1000,
                'Search "panner" ',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // When i was search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              autoFocus
              defaultValue={searchText}
              className="bg-transparent w-full h-full outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
