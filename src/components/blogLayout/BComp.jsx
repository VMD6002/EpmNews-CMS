import { Link } from "react-router-dom";

const Bl = ({id, imgurl, head, authr }) => {
  return (
    <div key="@" className="mx-auto w-11/12 my-8">
      <Link to={"/post/" + id}>
        <a>
          <div className="rounded-lg shadow-md overflow-hidden bg-logo3">
            <div className="flex object-bottom bg-no-repeat min-h-[14rem] h-56 justify-center mx-auto">
              <img src={imgurl} alt="PostImage" className="MImg" />
            </div>
            <div className="p-5 bg-gray-200">
              <span className="block mx-1 text-base font-semibold text-logo1  hover:text-gray-500 hover:underline">
                {head}
              </span>
              <p className="text-blue-900 mx-1 mt-2 text-xs">
                Author: {authr}
                <i className="float-right mt-2 text-xs text-logo1  hover:text-gray-500">
                  <span>Learn More</span>
                </i>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

const Sbl = ({ id, imgurl, head }) => {
  return (
    <div key="@" className="mx-auto my-8 lg:mx-5 w-11/12 lg:w-96">
      <Link href={"/post/" + id}>
        <a>
          <div className="rounded-lg flex flex-row shadow-md overflow-hidden bg-logo3">
            <div className="flex bg-no-repeat h-40 w-full justify-center mx-auto">
              <img
                src={imgurl}
                alt="PostImage"
                className="py-0 rounded-none object-contain lg:object-cover"
              />
            </div>
            <div className="p-5 bg-gray-200 flex lg:min-w-0 min-w-[60%] lg:w-auto">
              <span className="block mx-1 text-base font-semibold text-logo1  hover:text-gray-500 hover:underline my-auto">
                {head}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export { Bl, Sbl };
