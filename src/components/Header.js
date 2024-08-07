import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { APP_LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

    const handleSignOut = () => {
        signOut(auth).then(() => {})
          .catch((error) => {
            navigate("/error");
          });
    };

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({
                uid: uid,
                email: email, 
                displayName: displayName,
                photoURL: photoURL,
              })
             );
             navigate("/browse");
            } else {
              dispatch(removeUser());
              navigate("/");
            }
        });
        return () => unsubscribe();
    }, [dispatch, navigate]);

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView())
    }

    return  (
        <div className="absolute z-10 w-full overflow-x-hidden m-0 px-7 py-2 bg-gradient-to-b from-black flex justify-between">
            <img className="w-40"
               src = {APP_LOGO}
               alt = "netflix logo"
            />
            {user && (
              <div className="flex p-2 text-white items-center">
                <button className="px-2 py-1 mx-2 rounded-sm bg-red-600 hover:bg-opacity-80"
                        onClick={handleGptSearchClick}
                >
                  {showGptSearch ? "Home Page" : "GPT Search"}
                </button>
                <img className="rounded-sm h-8 w-8"
                   src = {USER_AVATAR}
                   alt="usericon"
                />
                <button 
                   className="font-bold p-1"
                   onClick={handleSignOut}
                >
                    (Sign Out)
                </button>
              </div>)}
        </div>
    );
};
export default Header;