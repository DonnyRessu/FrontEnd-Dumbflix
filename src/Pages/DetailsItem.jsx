import React, { useContext, useEffect, useState } from "react";
import useFetch from "../Config/useFetch";
import { useParams,Link } from "react-router-dom";
import ReactPlayer from "react-player";
import ApiConfig from "../Config/ApiConfig";
import { UserContext } from "../Context/UserContext";
import { ModalContext } from "../Context/ModalContext";
import { useQuery } from "react-query";
import { API } from "../Config/Api";
import placeholderThumb from "../assets/img/thumbnail_video_placeholder.jpg";
import DeleteEpisode from "../Components/Modal/deleteEpisode"

const DetailsItem = (props) => {
  const { id } = useParams();
  const { data } = useFetch(`${props.endpoint}${id}`);
  const [userState, userDispatch] = useContext(UserContext);
  const [modalState, modalDispatch] = useContext(ModalContext);
  const [urlVideo, setUrlVideo] = useState(null);
  const [episode, setEpisode] = useState(null);

  const { data: movie } = useQuery("moviesDetailCache", async () => {
    const response = await API.get(`${props.endpoint}${id}`);
    return response.data.data;
  });

  const { data: episodes } = useQuery("episodeDetailCache", async () => {
    const response = await API.get(`/film/${id}/episode`);
    setEpisode(response.data.data)
  });

  console.log(episodes?.thumbnail);

  // useEffect(() => {
  //   episodes?.map((index) => setEpisode(index));
  // }, [episodes]);

  return (
    <React.Fragment>
      {modalState.isUpdateEpisode && <DeleteEpisode/>}
      <div className="pt-10 bg-black/60">
        <div className="relative h-[500px] w-2/3 mx-auto">
          <ReactPlayer
            className={"absolute top-0 left-0"}
            width={"100%"}
            height={"100%"}
            light={
              <div className="px-40 h-[500px]">
                <img
                  className="w-full h-[500px] mx-auto"
                  src={movie ? movie.thumbnail : placeholderThumb}
                />
              </div>
            }
            controls={true}
            url={`${movie ? movie.link : null}`}
          />
        </div>
      </div>

      {userState.user.roles === "admin" ? (
        <div className="bg-black text-end  mx-auto px-8 py-5">
          <button
            onClick={() => modalDispatch({ type: "ADD_EPISODE_MODAL" })}
            className="bg-white text-red-500 px-8 py-2 mr-5 rounded-md"
          >
            Add Episode
          </button>
          <button
            onClick={() => modalDispatch({ type: 'UPDATE_EPISODE_MODAL' })}
            className="bg-red-700 text-white px-8 py-2 rounded-md"
          >
            Delete Episode
          </button>
        </div>
      ) : null}

      <div className="bg-black">
        <div
          className={`flex container justify-between mx-auto lg:px-8 ${
            userState.user.role === "admin" ? `pb-20` : `py-20`
          }`}
        >
          <div className="w-1/2 flex gap-x-8">
            <div className="w-1/3">
              <img src={movie?.thumbnail} alt="" />
            </div>
            <div className="w-2/3 flex flex-col justify-evenly">
              <h2 className="text-3xl font-semibold text-white">
                {movie?.title}
              </h2>
              <div className="flex items-center gap-3">
                <p>{movie?.year}</p>
                <p className="border rounded-md p-1">{movie?.category?.name}</p>
              </div>
              <p className="text-justify">{movie?.description}</p>
            </div>
          </div>
          <div className="w-1/2 mx-auto pl-28">
            <div className="h-48 carousel carousel-vertical rounded-box">
              {episode?.map((item)=>(
              <div className="carousel-item h-48">
                <Link to={item.linkFilm}>
                <img src={item.thumbnail}/>
                </Link>
              </div>
              ))}
            </div>
            {/* <div className="carousel w-full">
              {episode?.map((item)=>(
              <div id="slide1" className="carousel-item relative w-full">
                <Link to={item.linkFilm}>
                <img src={item.thumbnail} className="w-full" />
                </Link>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div>
              ))}
            </div> */}
            {/* <img className="rounded-md object-cover w-full h-[330px]" src={`${episode? episode?.thumbnail: placeholderThumb}`} alt="" />
            {console.log("Asu Raimu",episode?.thumbnail)} */}
            <h3>{movie?.title}</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailsItem;
