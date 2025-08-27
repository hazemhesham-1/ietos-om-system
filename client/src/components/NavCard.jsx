import { Link } from "react-router-dom";

const NavCard = ({ title, description, href, imageSrc, imageAlt }) => {
    return (
        <Link
            to={href}
            className="bg-gradient-to-r from-slate-100 to-slate-300/50 rounded-lg grid items-center group md:grid-cols-2 hover:to-primary-500/50 hover:scale-105 transition"
        >
            <img
                src={imageSrc}
                className="brightness-75 object-cover rounded-t-lg size-full md:rounded-none md:rounded-s-lg group-hover:brightness-100 transition"
                alt={imageAlt}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="text-slate-900 mb-2 text-2xl font-bold tracking-tight group-hover:text-primary-500">
                    {title}
                </h5>
                <p className="text-slate-700 mb-3 font-normal">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default NavCard;