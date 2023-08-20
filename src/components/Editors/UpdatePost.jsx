import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Helmet } from "react-helmet";
import Spinner from "../../Spiner";

const Post = ({ data, docID }) => {
  const history = useNavigate();

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: "600px",
    allowResizeY: true,
    zIndex: 0,
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "video",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "fullsize",
    ],
    buttonsMD: [
      "source",
      "|",
      "paragraph",
      "bold",
      "italic",
      "strikethrough",
      "underline",
      "|",
      "image",
      "video",
      "link",
      "|",
      "brush",
      "font",
      "|",
      "align",
      "hr",
      "|",
      "undo",
      "redo",
      "|",
      "eraser",
      "dots",
    ],
  };
  // for posting
  const [head, setHead] = useState(data.head);
  const [cont, setCont] = useState(data.cont);
  const [autho, setAutho] = useState(data.authr);
  const [ImageDes, setImagedes] = useState("");
  const [Tag, setTag] = useState(data.tags);

  // messages
  const [load, setload] = useState(false);
  const [error, setError] = useState(null);
  const [mess, setMess] = useState("");

  //Tags
  const [Dropd] = useState([
    { name: "World", col: "gray-200", key: "wor" },
    { name: "India", col: "yellow-200", key: "in" },
    { name: "kerala", col: "gray-200", key: "kl" },
    { name: "Sports", col: "gray-200", key: "spo" },
    { name: "Saudi", col: "red-200", key: "sa" },
    { name: "UAE", col: "blue-200", key: "ae" },
    { name: "Oman", col: "gray-200", key: "omn" },
    { name: "Qatar", col: "gray-200", key: "qt" },
    { name: "Kuwait", col: "gray-200", key: "kwa" },
    { name: "Health", col: "gray-200", key: "hlth" },
  ]);

  async function Updatepost(e) {
    e.preventDefault();
    if (cont && head && autho && Tag) {
      setload(true);
      const docRef = db.collection("News").doc(docID);
      docRef.update({
        head: head,
        imagedes: ImageDes,
        cont: cont,
        authr: autho,
        ...Tag,
      });
      setError("");
      setMess("Posted Succesfully");
      setHead("");
      setCont("");
      setAutho("");
      setTimeout(() => {
        setMess("");
      }, 1000);
      setTimeout(() => {
        history("/edit");
      }, 2500);
    } else {
      setMess("");
      setError("there was an error updating");
    }
    setload(false);
  }
  return (
    <div className="h-full flex bg-logo2">
      <div className="max-w-3xl mx-auto my-8">
        <div className="grid gap-6 flex-grow">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              News Posting
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Please complete all the colums before posting
            </p>
          </div>
          <form
            className="w-screen sm:max-w-3xl mx-auto"
            onSubmit={(e) => {
              Updatepost(e);
            }}
          >
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 p-6">
                <div>
                  <input
                    type="text"
                    className="shadow-sm text-xs focus:ring-indigo-500 focus:border-indigo-500 block w-5/12 mx-auto border border-gray-300 rounded-lg px-2 py-1"
                    placeholder="Image Description"
                    value={ImageDes}
                    onChange={(e) => setImagedes(e.target.value)}
                  />
                  <div className="mt-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Heading
                    </label>
                    <input
                      type="text"
                      className="shadow-sm text-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-lg p-4"
                      placeholder="Heading"
                      value={head}
                      onChange={(e) => setHead(e.target.value)}
                    />
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Contents
                  </label>
                  <div className="mt-1">
                    <JoditEditor
                      value={cont}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setCont(newContent)}
                    />
                  </div>
                  <div className="mt-3 lg:float-right md:float-right sm:float-none">
                    <h1 className="block text-sm font-medium text-gray-700">
                      Author
                    </h1>
                    <input
                      type="text"
                      className="inline-block shadow-sm text-xs focus:ring-indigo-500 focus:border-indigo-500 mt-1 border border-gray-300 rounded-lg p-2"
                      placeholder="Example = Jhone doe"
                      value={autho}
                      onChange={(e) => setAutho(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <h1 className="block bg-white text-sm font-medium text-gray-700 pl-5 lg:py-5 md:py-4 sm:py-0">
                Tags
              </h1>
              <div className="pr-5 grid grid-cols-3 lg:grid-cols-5 md:grid-cols-5 bg-white">
                {Dropd.map((det) => (
                  <div key={det.key} className="mx-1">
                    <div
                      className={`block w-full px-1 bg-${det.col} py-2 my-1 mx-3 rounded-lg`}
                    >
                      <input
                        type="checkbox"
                        name={det.key}
                        checked={Tag[det.key]}
                        onChange={(e) => {
                          setTag({
                            ...Tag,
                            [e.target.name]: e.target.checked,
                          });
                        }}
                        className="focus:ring-indigo-500 h-3 w-4 text-indigo-600 border-gray-300"
                      />
                      <label className="mx-2">{det.name}</label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={load}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
              {error && (
                <div className="flex px-4 bg-red-400 sm:px-6 text-white justify-center py-4">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="white"
                    className="inline-block mr-2"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <b>{error}</b>
                </div>
              )}
              {mess && (
                <div className="flex px-4 bg-green-400 sm:px-6 text-white justify-center py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z" />
                  </svg>
                  <b>{mess}</b>
                </div>
              )}
            </div>
          </form>
        </div>{" "}
        ``
      </div>
    </div>
  );
};

export default function UpdatePost() {
  // Getting document
  const { docID } = useParams();
  const [doc, setDoc] = useState({});
  useEffect(() => {
    async function hello() {
      const post = (await db.collection("News").doc(docID).get()).data();
      setDoc({
        head: post.head,
        cont: post.cont,
        authr: post.authr,
        tags: {
          ae: post.ae,
          hlth: post.hlth,
          in: post.in,
          kl: post.kl,
          kwa: post.kwa,
          omn: post.omn,
          qt: post.qt,
          sa: post.sa,
          spo: post.spo,
          wor: post.wor,
        },
      });
    }
    hello();
  }, [docID]);

  return (
    <>
      <Helmet>
        <title>Update Post</title>
      </Helmet>
      {doc.cont ? <Post data={doc} docID={docID} /> : <Spinner />}
    </>
  );
}
