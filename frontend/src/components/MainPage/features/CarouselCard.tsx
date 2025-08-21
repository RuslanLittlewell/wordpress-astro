import { FC } from "react";
interface Props {
  url: string;
  image: string;
  price: string;
  title: string;
}
export const CarouselCard: FC<Props> = ({ url, image, price, title }) => {
  return (
    <a
      href={url}
      className="group block p-6 bg-white rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <h2 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
        {title}
      </h2>
      <div className="relative flex-1 w-full overflow-hidden rounded-lg bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            width={300}
            height={350}
            loading="eager"
            className="object-cover rounded h-[350px] w-full transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="h-[350px] w-full bg-gray-100 rounded mt-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-center text-xl font-semibold mt-6">от <span className="text-indigo-600">{price} BYN</span> в сутки</p>
    </a>
  );
};
