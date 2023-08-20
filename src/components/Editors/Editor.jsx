import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { storage, db, timestamp } from "../Firebase/firebase";
import {
  startAfter,
  collection,
  query,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { BsImageFill, BsFileEarmarkCheckFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { Helmet } from "react-helmet";
import { SkPosts } from "../SkelComp";
import InfiniteScroll from "react-infinite-scroll-component";
import { lazy } from "react";

const JoditEditor = lazy(() => import("jodit-react"));

const Posts = (props) => {
  // geting image details with url and deleting it
  async function delImage(url) {
    const imageRef = storage.refFromURL(url);
    await imageRef.delete();
  }

  const loadMore = async (val) => {
    const last = props.post[props.post.length - 1];
    const q = query(
      collection(db, "News"),
      orderBy("createdAt", "desc"),
      startAfter(new Date(last.createdAt)),
      limit(val)
    );
    const res = await getDocs(q);
    const newblogs = res.docs.map((docSnap) => {
      return {
        head: docSnap.data().head,
        url: docSnap.data().url,
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    props.setPost([...props.post, ...newblogs]);
    if (newblogs.length < val) {
      props.setEnd(true);
    }
  };

  // gteing post dtails from doc id and deleting it
  async function deltForm(e, url) {
    delImage(url);
    await db.collection("News").doc(e).delete();
    props.setds("Post Deleted Successfully");
    setTimeout(() => {
      props.setds("");
    }, 1500);
  }

  // To change the selected post image
  async function ChangImage(docId, docUrl) {
    if (props.image) {
      const storageRef = storage.ref();
      const docRef = db.collection("News").doc(docId);
      const imageRef = storageRef.child(uuidv4());
      await imageRef.put(props.image);
      const url = await imageRef.getDownloadURL();
      docRef.update({
        url: url,
      });
      delImage(docUrl);
      props.setim(false);
    } else;
  }

  return (
    <InfiniteScroll
      dataLength={props.post.length}
      next={() => loadMore(3)}
      hasMore={!props.end}
      loader={
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <SkPosts />
          <SkPosts />
          <SkPosts />
        </div>
      }
      endMessage={
        <div className="flex justify-center w-11/12 max-w-3xl mx-auto text-white shadow-lg bg-zinc-700 rounded-xl">
          <h1 className="px-2 py-1">You have reached the end</h1>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <For each="doc" of={props.post}>
          <section className="mx-5 lg:px-1 md:px-2 lg:mx-0 md:mx-0 sm:mx-5">
            <div className="grid my-1 overflow-hidden bg-gray-800 rounded-lg shadow-lg md:mx-auto">
              <div className="flex object-bottom bg-no-repeat border-t-8 border-l-4 border-r-4 border-gray-800">
                <div className="w-full bg-gray-700">
                  <Choose>
                    <When condition={props.imag && doc.id === props.cdoc}>
                      <div className="flex w-full">
                        <button
                          className="w-full text-sm text-white bg-green-400 rounded-t-lg px-9"
                          onClick={() => ChangImage(doc.id, doc.url)}
                        >
                          Save
                        </button>
                      </div>
                    </When>
                    <Otherwise>
                      <label className="relative flex justify-start w-full">
                        <p className="px-2 py-0.5 text-gray-800 text-xs uppercase cursor-pointer w-full text-center rounded-t-lg bg-orange-300">
                          Change Image
                        </p>
                        <input
                          id="file-upload"
                          accept="image/x-png,image/jpeg"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            props.onImageChange(e, true, false, doc.id)
                          }
                        />
                      </label>
                    </Otherwise>
                  </Choose>
                  <div className="flex justify-center w-full">
                    <img
                      src={doc.url}
                      alt="PostImage"
                      className="object-contain h-56 py-0 my-0 rounded-none lg:w-full md:w-full sm:h-64 md:h-48 lg:h-40"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-5">
                <span
                  href="#"
                  className="block mb-1 text-xl font-bold text-center text-white"
                >
                  {doc.head}
                </span>
                <div className="flex flex-row justify-between w-full">
                  <Link
                    to={`/UpdatePost/${doc.id}`}
                    className="flex justify-center px-2 py-2 mt-5 mb-1 text-black bg-blue-300 rounded-full"
                  >
                    <FaEdit size="18px" />
                  </Link>
                  <span className="mt-8 text-xs text-gray-200">
                    Written by &apos;{doc.authr}&apos;
                  </span>
                  <button
                    type="submit"
                    className="flex justify-center px-2 py-2 mt-5 mb-1 text-black bg-red-300 rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      deltForm(doc.id, doc.url);
                    }}
                  >
                    <TiDelete size="20px" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </For>
      </div>
    </InfiniteScroll>
  );
};

export default function Editor() {
  // data points //

  // for posting
  const [post, setPost] = useState([]);
  const [head, setHead] = useState("");
  const [cont, setCont] = useState("Contents here");
  const [autho, setAutho] = useState("");
  const [ImageDes, setImagedes] = useState("");
  const [end, setEnd] = useState(false);
  const [image, setImage] = useState(null);
  const [cdoc, setCdoc] = useState(null);
  const [error, setError] = useState(null);
  const [mess, setMess] = useState("");
  const [imagup, setimup] = useState("Upload Image");
  const [load, setload] = useState(false);
  const [Imag, setTim] = useState(false);
  const [ds, setds] = useState(""); // post delet
  const [imag, setim] = useState(false);
  const [Tag, setTag] = useState({
    ae: false,
    hlth: false,
    in: false,
    kl: false,
    kwa: false,
    omn: false,
    qt: false,
    sa: false,
    spo: false,
    wor: false,
  });
  // details for the tags
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

  useEffect(() => {
    const fetchData = async () => {
      db.collection("News")
        .orderBy("createdAt", "desc")
        .limit(3)
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({
              head: doc.data().head,
              authr: doc.data().authr,
              url: doc.data().url,
              createdAt: doc.data().createdAt.toMillis(),
              id: doc.id,
            });
          });
          setPost(documents);
        });
    };
    fetchData();
  }, []);
  // functions //
  // saving the image value for later use
  async function onImageChange(e, im, Im, docID) {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file && Im) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(file);
          setimup("Uploaded Successfuly,Click to Change Image");
          setTim(true);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (file && im) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(file);
          setCdoc(docID);
          setim(true);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  }

  // Createing a new post
  async function uploadToFirebase(e) {
    e.preventDefault();
    if (image && cont && head && autho) {
      setload(true);
      const storageRef = storage.ref();
      const dbref = db.collection("News");
      const imageRef = storageRef.child(uuidv4());
      await imageRef.put(image);
      const url = await imageRef.getDownloadURL();
      const createdAt = timestamp();
      dbref.add({
        url: url,
        imagedes: ImageDes,
        createdAt: createdAt,
        head: head,
        cont: cont,
        authr: autho,
        ...Tag,
      });
      setimup("Upload Image");
      setMess("Posted Succesfully");
      setCont("Contents here");
      setTag({
        ae: false,
        hlth: false,
        in: false,
        kl: false,
        kwa: false,
        omn: false,
        qt: false,
        sa: false,
        spo: false,
        wor: false,
      });
      setError("");
      setImagedes("");
      setHead("");
      setAutho("");
      setTimeout(() => {
        setMess("");
      }, 1500);
    } else {
      setMess("");
      setError("Pls Check if every thing is filled");
      setTimeout(() => {
        setError("");
      }, 1500);
    }
    setload(false);
  }

  return (
    <>
      <Helmet>
        <title>EPM News Editor</title>
        <meta name="title" content="Editor" />
        <meta name="description" content="Editor / Update / Delete" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English Malayalam" />
      </Helmet>
      <div className="h-full flex bg-[#d1c8ba]">
        <div className="max-w-4xl mx-auto my-8">
          <div className="grid flex-grow gap-6">
            <div className="px-4 lg :px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                News Posting
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please complete all the colums before posting
              </p>
            </div>
            <form
              className="w-screen mx-auto sm:max-w-4xl"
              onSubmit={(e) => {
                uploadToFirebase(e);
              }}
            >
              <div className="overflow-hidden rounded-md shadow">
                <div className="p-6 px-4 py-5 space-y-3 bg-white">
                  <div>
                    <h3 className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </h3>
                    <div className="justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="py-3 space-y-2 text-center">
                        <div className="flex justify-center align-middle">
                          {Imag ? (
                            <BsFileEarmarkCheckFill
                              size="2.8rem"
                              color="gray"
                            />
                          ) : (
                            <BsImageFill size="3rem" />
                          )}
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative mx-auto font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>{imagup}</span>
                            <input
                              id="file-upload"
                              accept="image/x-png,image/jpeg"
                              type="file"
                              className="sr-only"
                              onChange={(e) => {
                                onImageChange(e, false, true);
                              }}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="block w-5/12 px-2 py-1 mx-auto text-xs border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Image Description"
                    value={ImageDes}
                    onChange={(e) => setImagedes(e.target.value)}
                  />
                  <div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Heading
                      </label>
                      <input
                        type="text"
                        className="block w-full p-4 mt-1 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Heading"
                        value={head}
                        onChange={(e) => setHead(e.target.value)}
                      />
                    </div>
                    <label className="block mt-4 text-sm font-medium text-gray-700">
                      Contents
                    </label>
                    {useMemo(
                      () => (
                        <div className="mt-1 prose prose-emerald max-w-none">
                          <JoditEditor
                            value={cont}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setCont(newContent)}
                          />
                        </div>
                      ),
                      [cont]
                    )}
                    <div className="mt-3 lg:float-right md:float-right sm:float-none">
                      <h1 className="block text-sm font-medium text-gray-700">
                        Author
                      </h1>
                      <input
                        type="text"
                        className="inline-block p-2 mt-1 text-xs border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Example = Jhone doe"
                        value={autho}
                        onChange={(e) => setAutho(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <h1 className="block pl-5 text-sm font-medium text-gray-700 bg-white lg:py-5 md:py-4 sm:py-0">
                  Tags
                </h1>
                <div className="grid grid-cols-3 pr-5 bg-white lg:grid-cols-5 md:grid-cols-5">
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
                          className="w-4 h-3 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label className="mx-2">{det.name}</label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    disabled={load}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
                <Choose>
                  <When condition={error}>
                    <div className="flex justify-center px-4 py-4 text-white bg-red-400 sm:px-6">
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
                  </When>
                  <When condition={mess}>
                    <div className="flex justify-center px-4 py-4 text-white bg-green-400 sm:px-6">
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
                  </When>
                  <When condition={ds}>
                    <div className="flex justify-center px-4 py-4 bg-yellow-200 sm:px-6">
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
                      <b>{ds}</b>
                    </div>
                  </When>
                </Choose>
              </div>
            </form>
            <Choose>
              <When condition={post}>
                <Choose>
                  <When condition={post.length === 0}>
                    <div className="flex mx-auto">No posts</div>
                  </When>
                  <Otherwise>
                    <Posts
                      post={post}
                      setds={setds}
                      setEnd={setEnd}
                      image={image}
                      setim={setim}
                      onImageChange={onImageChange}
                      imag={imag}
                      cdoc={cdoc}
                      setPost={setPost}
                      end={end}
                    />
                  </Otherwise>
                </Choose>
              </When>
              <Otherwise>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                  <SkPosts />
                  <SkPosts />
                  <SkPosts />
                </div>
              </Otherwise>
            </Choose>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-[#212121]">
        <p className="py-5 mx-auto text-xs text-zinc-200">
          Nothing Down here simply here for style
        </p>
      </div>
    </>
  );
}
const config = {
  readonly: false,
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
