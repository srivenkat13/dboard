import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { faShare, faEye,faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Share = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomUrl, setRoomUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCreateSession = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    const newRoomUrl = `${window.location.origin}/${newRoomId}`;
    setRoomUrl(newRoomUrl);
    setIsModalOpen(true);
  };

  const handleRouting = () => {
    router.push(`/${roomUrl.split("/").pop()}`);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(roomUrl)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handleModelClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setIsCopied(false);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleCreateSession}
        className={`${styles.buttonPrimary} ${styles.textWhite} py-2 px-4 rounded-full m-4 `}
      >
        Share {"     "}
        <FontAwesomeIcon icon={faShare} />
      </button>
        

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleModelClose}>
          <div className={styles.modalContent}>
            <h2
              className={`${styles.textBlack} ${styles.textBold} text-2xl font-bold mb-4`}
            >
              Live collaboration
            </h2>
            <p className="mb-2">
              Invite people to collaborate on your drawing.
            </p>
            <button
              onClick={handleRouting}
              className={`${styles.buttonPrimary} ${styles.textWhite} font-bold py-2 px-4 rounded`}
            >
              Start Live Session {""}
              <FontAwesomeIcon icon={faEye}/>
            </button>
            <p className="mt-4  mb-2 border-blue-600">{roomUrl}</p>
            <button
              onClick={handleCopy}
              className={`${styles.copyButton} ${styles.textWhite} py-1 px-2 font-semibold rounded-lg`}
            >
              {isCopied ? "Copied !! 🎊" : <FontAwesomeIcon icon={faCopy}/>}
              
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
