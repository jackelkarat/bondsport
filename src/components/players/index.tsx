import React, { useEffect, useState } from "react";
import { PlayerType } from "../../types/player";
import Card from "../Card";
import toast, { Toaster } from "react-hot-toast";


function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PlayerType[]>([]);
  const [favourites, setFavourites] = useState<PlayerType[]>([]);
  const [searchInput, setSearchInput] = useState<String>('');
  const [filteredResults, setFilteredResults] = useState<PlayerType[]>([]);
  const [colors, setColors] = useState(["#418da7", "#e36503", "#ffff00", "#c3c3b8", "#ffc0cb", "#fff"]);
  const [colorSelected, setColorSelected] = useState('');

  useEffect(() => {
    const url = "https://www.balldontlie.io/api/v1/players";
    // Allows us to intercept an API request so we can cancel anytime - sending signal in fetch will destroy immediately
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal }).then((res) => res.json());
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("api request has been cancelled");
          }
          console.log(err.name);
        } else {
          console.log("This is an unknown error");
        }
      }
    };
    fetchData();
    return () => {
      // cleanup the abort controller
      controller.abort();
    };
  }, []);

  const addPlayer = (player: PlayerType) => {
    if (!favourites.includes(player)) {
      toast.success("Added to favourites");
      setFavourites([...favourites, player]);
    } else {
      toast.success("Removed from favourites");
      setFavourites([...favourites.filter((item) => item !== player)]);
    }
  };

  const removeFlights = (player: PlayerType) => {
    toast.success("Removed from favourites");
    setFavourites([...favourites.filter((item) => item !== player)]);
  };

  const searchPlayer = (searchInput:string) => {
    setSearchInput(searchInput);
    if (searchInput !== '') {
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else{
      setFilteredResults(data)
    }
  };


  const changeColor = (color:string) => {
      setColorSelected(color)
  };

  if (isLoading) return <p>Loading...</p>;


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

  <div className="search">
      <input
          type="text"
          className="searchTerm"
          placeholder="Search player"
          onChange={event => searchPlayer(event.target.value)}
      />
    <button type="submit" className="searchButton">
      &#128269;
    </button>
  </div>


      <div className="cards">
        <Card title="Players"  backgroundColor="#fff">
          {searchInput.length > 1 ?
            filteredResults?.map((item) => (
              <div
                key={item.id}
                className="player"
              >
                <li>{item.last_name + ' ' + item.first_name}</li>
                <button onClick={() => addPlayer(item)}>&#9733;</button>
              </div>
            ))
          :
          data?.map((item) => (
                  <div
                      key={item.id}
                      className="player">
                    <li>{item.last_name + ' ' + item.first_name}</li>
                    <button onClick={() => addPlayer(item)}>&#9733;</button>
                  </div>
              ))
          }
        </Card>




        <Card title="Favorite players" backgroundColor={colorSelected}>
          <div className="box-position">
            <div className="box-container" >
              {colors?.map((color) => (
                  <div className="box" onClick={() => changeColor(color)} style={{background: color}}></div>
              ))}
            </div>
          </div>

          {favourites.length ? (
            favourites?.map((item) => (
              <div
                key={item.id}
                className="player"
              >
                <li>{item.last_name + ' ' + item.first_name}</li>
                <button  onClick={() => removeFlights(item)}>&#xe020;</button>
              </div>
            ))
          ) : (
            <p>Nothing added to your list yet</p>
          )}
        </Card>
      </div>
    </>
  );
}


export default Players;
