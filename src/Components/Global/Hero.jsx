import { Link } from 'react-router-dom';

const Hero = (props) => {
  return (
    <div className="pt-12">
      <div className="hero relative h-[600px] w-full">
        <img src={props.heroImage} alt="" className="object-cover  w-full h-[600px]" />
        <div className="bg-gradient-to-t from-black  absolute left-0 right-0 top-0 bottom-0 px-28 pt-20">
          <div className="text-white">
            <h1 className="text-8xl mb-3">{props.heroTitle}</h1>
            <p className="mb-2 w-1/2">{props.heroDesc}</p>
            <div className="flex gap-2 mb-5">
              <p>{props.year}</p>
              <p className="border border-1 px-2 rounded-md">{props.heroCateg}</p>
            </div>
            <Link to={props.linkTo} className=" bg-red-700 px-10 py-3 text-lg font-semibold rounded-md shadow-md shadow-slate-900">
              WATCH NOW !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
