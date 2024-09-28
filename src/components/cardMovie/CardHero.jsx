export default function cardHero({ item, img }) {
  return (
    <div className="w-[250px] bg-secondary rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={`${img}${item?.poster_path}`}
        alt={item?.original_title}
        className="h-[375px] w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg">
          {item?.original_title}
        </h3>
        <p className="text-sm text-gray-400">{item?.release_date}</p>
      </div>
    </div>
  );
}
