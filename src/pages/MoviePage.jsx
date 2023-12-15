import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { useAppContext } from "../context";

const MoviePage = () => {
  const { id } = useParams();

  const { selectedMovie, setSelectedMovie } = useAppContext();

  const [favorite, setFavorite] = useState();

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/movies/" + id)
        .then((res) => res.json())
        .then((data) =>
          Object.keys(data).length > 0
            ? setSelectedMovie(data)
            : setSelectedMovie(null)
        )
        .catch((err) => {
          console.error(err);
        });
      setFavorite(window.localStorage.getItem(`${id}`));
    }
  }, [id]);

  const addToFavorite = () => {
    if (favorite) {
      window.localStorage.removeItem(`${id}`);
      setFavorite(null);
    } else {
      window.localStorage.setItem(`${id}`, `like`);
      setFavorite(window.localStorage.getItem(`${id}`));
    }
  };

  const imgError = (event) => {
    event.target.src =
      "https://sun7-22.userapi.com/impf/JMFMlY8pFP47e0VusgXl5SoQxi9tnHGdF4HllA/lBG_LBeCpv8.jpg?size=960x960&quality=96&sign=96d8475b3a1ebd1e6c19c0d7ada5d9e3&type=album";
  };

  if (!selectedMovie) {
    return (
      <div className="home">
        <h1 className="home__title">Фильм номер {id} не найден</h1>
      </div>
    );
  }
  return (
    <div className="movie__container">
      <div className="movie__header">
        <p>
          Id: {id}
          {favorite ? (
            <AiFillLike onClick={addToFavorite} />
          ) : (
            <BiLike onClick={addToFavorite} />
          )}
        </p>
        <Link to={`/editMovie/${id}`}>
          <BiEdit />
          Редактировать
        </Link>
      </div>
      <div className="movie__main">
        <img
          onError={imgError}
          width="200"
          height="300"
          src={selectedMovie?.posterUrl}
          alt={"Film poster"}
        />
        <div className="movie__main-info">
          <h1>{selectedMovie?.title}</h1>
          <h2>{selectedMovie?.director}</h2>
          <h3>Параметры</h3>
          <div className="movie__main-param">
            <p>Год производства</p>
            <p>{selectedMovie?.year}</p>
          </div>
          <div className="movie__main-param">
            <p>Продолжительность</p>
            <p>{selectedMovie?.runtime} мин</p>
          </div>
          <div className="movie__main-param">
            <p>Жанры</p>
            <p>{selectedMovie?.genres.join(", ")}</p>
          </div>
          <div className="movie__main-param">
            <p>Актеры</p>
            <p>{selectedMovie?.actors}</p>
          </div>
        </div>
      </div>
      <div className="movie__plot">
        <h2>Описание</h2>
        <p>{selectedMovie?.plot}</p>
      </div>
    </div>
  );
};

export default MoviePage;
