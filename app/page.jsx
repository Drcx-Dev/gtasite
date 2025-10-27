"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import gta3 from "../app/photo/gta3.jpg";
import gta4 from "../app/photo/gta4.jpg";
import gta5v from "../app/photo/gta5v.jpg";
import gtavc from "../app/photo/gtavc.jpg";
import { genres } from "./genres";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState(genres);

  const images = [gta3, gta4, gta5v, gtavc];

  const news = [
    {
      id: 1,
      title: "Новый мод для GTA 5",
      description:
        "Сейчас доступен новый мод, который изменяет погодные условия и добавляет уникальные эффекты в мир GTA 5!",
      link: "/news/1",
    },
    {
      id: 2,
      title: "Обновление для GTA 4",
      description:
        "Для GTA 4 выпустили очередное обновление, которое улучшает графику и добавляет новый контент!",
      link: "/news/2",
    },
    {
      id: 3,
      title: "Голосование за будущие DLC в GTA V",
      description:
        "Rockstar Games запускает голосование за то, какие DLC должны быть добавлены в GTA V в следующем обновлении.",
      link: "/news/3",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = genres.filter(
      (movie) =>
        searchQuery.trim() !== "" &&
        movie.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    setFilteredMovies(filtered);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-900 to-indigo-600 min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-6 flex justify-between items-center w-full shadow-lg rounded-b-xl">
        <div className="text-3xl font-bold font-serif">DRCX'S GAMES</div>

        <form
          onSubmit={handleSearch}
          className="relative flex items-center space-x-2 w-full max-w-lg"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск игры..."
            className="p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 w-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="p-3 bg-purple-900 rounded-r-lg hover:bg-purple-600 transition-all transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Поиск
          </button>
        </form>
      </header>

      <main className="flex justify-center items-center relative mt-8">
        <motion.div
          className="relative w-full h-[75vh] sm:h-[80vh] md:h-[90vh] lg:h-[90vh] rounded-xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="transition-all duration-700 ease-in-out transform rounded-xl shadow-lg">
            <Image
              src={images[currentIndex]}
              alt="Game poster"
              className="w-full h-[800px] object-cover rounded-xl"
            />
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600 md:hidden"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full hover:bg-gray-600 md:hidden"
          >
            &#10095;
          </button>
        </motion.div>
      </main>

      <section className="mt-72">
        <div className="flex flex-wrap gap-8 mt-8 justify-center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((product) => (
              <motion.div
                key={product.id}
                className="product h-96 p-2 w-64 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/movie-details/${product.id}`}>
                  <div className="cursor-pointer">
                    <Image
                      width={500}
                      height={400}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mt-4 text-center">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-white">Игры не найдены</p>
          )}
        </div>
      </section>

      <section className="mt-24 px-4">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Свежие новости о GTA
        </h2>
        <div className="space-y-8">
          {news.map((item) => (
            <motion.div
              key={item.id}
              className="news-item bg-gray-800 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.link}>
                <div className="cursor-pointer">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2">{item.description}</p>
                  <p className="mt-4 text-blue-400 hover:underline">
                    Читать далее...
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-24 px-4 text-white">
        <h2 className="text-3xl font-semibold text-center mb-8">
          GTA 6: Релиз и подробности
        </h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold">Дата релиза: 2025 год</h3>
          <p className="mt-4">
            GTA 6 обещает стать самой амбициозной игрой в истории серии.
            Ожидается, что игра будет включать новые города, сюжетные линии и
            улучшенную графику.
          </p>

          <div className="mt-6 text-lg">
            <h4 className="font-semibold">Будь в курсе:</h4>
            <p className="mt-2">
              Мы будем держать тебя в курсе всех новостей и обновлений по GTA 6!
            </p>
          </div>
        </div>
      </section>
      <section className="mt-24 px-4 text-white">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Поделиться с друзьями
        </h2>
        <div className="flex justify-center space-x-4">
          <button className="p-2 bg-blue-500 text-white rounded-full">
            Facebook
          </button>
          <button className="p-2 bg-blue-400 text-white rounded-full">
            Twitter
          </button>
          <button className="p-2 bg-red-500 text-white rounded-full">
            Instagram
          </button>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white py-8 mt-14 rounded-t-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">DRCX'S GAMES</div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} DRCX'S GAMES. Все права защищены.
        </div>
      </footer>
    </section>
  );
}
