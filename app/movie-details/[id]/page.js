"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { genres } from "@/app/genres";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Link from "next/link";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) return <div>Загрузка...</div>;

  const genre = genres.find((genre) => genre.id === parseInt(id));

  if (!genre) {
    return <div>Жанр не найден!</div>;
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: genre.name,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Ссылка скопирована в буфер обмена!"))
        .catch((error) => console.error("Error copying link", error));
    }
  };

  return (
    <div
      id="movie-page"
      className="movie-details bg-blue-500 text-white pt-8 px-4 md:px-8 "
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gradient">
          {genre.name}
        </h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        <motion.div
          className="lg:w-1/3 mb-6 lg:mb-0 flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            className="rounded-xl shadow-lg "
            src={genre.image2}
            alt={genre.name}
            width={500}
            height={300}
            layout="responsive"
            objectFit="cover"
          />
          <Image
            className="mt-4 "
            src={genre.image3}
            alt={genre.name}
            width={300}
            height={300}
            objectFit="cover"
          />
        </motion.div>

        <motion.div
          className="lg:w-2/3 text-xl max-w-prose mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-semibold max-w-screen-sm mt-3 text-2xl">
            {genre.description}
          </p>
          <p className="pt-3 text-white text-start max-w-prose text-2xl">
            {genre.plot}
          </p>
        </motion.div>
      </div>

      {/* Видео */}
      {genre.videos && genre.videos.length > 0 ? (
        <div className="mt-8">
          {genre.videos.map((videoUrl, index) => (
            <motion.div
              key={index}
              className="player-wrapper mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              style={{ maxWidth: "100%", margin: "auto" }}
            >
              <ReactPlayer
                url={videoUrl}
                className="react-player"
                width="100%"
                height="400px"
                controls
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center"></p>
      )}

      {genre.downloadLink && (
        <motion.div
          className=" relative bottom-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          <a
            href={genre.downloadLink}
            download
            className="bg-green-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Скачать: {genre.name}
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default MovieDetails;
