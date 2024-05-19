'use client';

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
// import { SendIcon } from "./SendIcon.js";
// import { SizeIcon } from "./SizeIcon.js";
// import { InfoCircled } from "./InfoCircled.js";
// import { CloseIcon } from "./CloseIcon.js";
// import { TrashIcon } from "./TrashIcon.js";

export function ConvexAiChat({
  convexUrl,
  infoMessage,
  name,
  welcomeMessage,
  renderTrigger,
}: {
  convexUrl: string;
  name: string;
  infoMessage: ReactNode;
  welcomeMessage: string;
  renderTrigger: (onClick: () => void) => ReactNode;
}) {
  const [hasOpened, setHasOpened] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
      {renderTrigger(() => {
        setHasOpened(true);
        setDialogOpen(!dialogOpen);
      })}
      {hasOpened
        ? createPortal(
            <ConvexAiChatDialog
              convexUrl={convexUrl}
              infoMessage={infoMessage}
              isOpen={dialogOpen}
              name={name}
              welcomeMessage={welcomeMessage}
              onClose={handleCloseDialog}
            />,
            document.body
          )
        : null}
    </>
  );
}

export function ConvexAiChatDialog({
  convexUrl,
  infoMessage,
  isOpen,
  name,
  welcomeMessage,
  onClose,
}: {
  convexUrl: string;
  infoMessage: ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}) {

  return (
    <Dialog
        infoMessage={infoMessage}
        isOpen={isOpen}
        name={name}
        welcomeMessage={welcomeMessage}
        onClose={onClose}
      />
  );
}

export function Dialog({
  infoMessage,
  isOpen,
  name,
  welcomeMessage,
  onClose,
}: {
  infoMessage: ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}) {
  const sessionId = useSessionId();
  // const remoteMessages = useQuery(api.messages.list, { sessionId });
  // const messages = useMemo(
  //   () =>
  //     [{ isViewer: false, text: welcomeMessage, _id: "0" }].concat(
  //       (remoteMessages ?? []) as {
  //         isViewer: boolean;
  //         text: string;
  //         _id: string;
  //       }[]
  //     ),
  //   [remoteMessages, welcomeMessage]
  // );
  // const sendMessage = useMutation(api.messages.send);
  // const clearMesages = useMutation(api.messages.clear);

  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const [input, setInput] = useState("");

  const handleExpand = () => {
    setExpanded(!expanded);
    setScrolled(false);
  };

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    // await sendMessage({ message: input, sessionId });
    setInput("");
    setScrolled(false);
  };

  const handleClearMessages = async () => {
    // await clearMesages({ sessionId });
    setScrolled(false);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrolled) {
      return;
    }
    // Using `setTimeout` to make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [ isScrolled]);

  return (
    <div
      className={
        (isOpen ? "fixed" : "hidden") +
        " rounded-xl flex flex-col bg-white dark:bg-black text-black dark:text-white " +
        "m-4 right-0 bottom-0 max-w-[calc(100%-2rem)] overflow-hidden transition-all " +
        "shadow-[0px_5px_40px_rgba(0,0,0,0.16),0_20px_25px_-5px_rgb(0,0,0,0.1)] " +
        "dark:shadow-[0px_5px_40px_rgba(0,0,0,0.36),0_20px_25px_-5px_rgb(0,0,0,0.3)] " +
        (expanded
          ? "left-0 top-0 z-[1000]"
          : "w-full sm:max-w-[25rem] sm:min-w-[25rem] h-[30rem]")
      }
    >
      <div className="flex justify-end">
        <button
          className="group border-none bg-transparent p-0 pt-2 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={() => void handleClearMessages()}
        >
          {/* <InfoCircled className="h-5 w-5" /> */}
          <svg
      className={"h-5 w-5"}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
          <span
            className={
              "invisible absolute z-50 cursor-auto group-hover:visible text-base text-black dark:text-white " +
              "rounded-md shadow-[0px_5px_12px_rgba(0,0,0,0.32)] p-2 bg-white dark:bg-neutral-700 top-12 right-8 left-8 text-center"
            }
          >
            {infoMessage}
          </span>
        </button>
        <button
          className="border-none bg-transparent p-0 pt-2 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={() => void handleClearMessages()}
        >
          {/* <TrashIcon className="h-5 w-5" /> */}
          <svg
      className={"h-5 w-5"}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
        </button>
        <button
          className="border-none bg-transparent p-0 pt-2 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={handleExpand}
        >
          {/* <SizeIcon className="h-5 w-5" /> */}
          <svg
      className={"h-5 w-5"}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
        </button>
        <button
          className="border-none bg-transparent p-0 pt-2 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={onClose}
        >
          {/* <CloseIcon className="h-5 w-5" /> */}
          <svg
      className={"h-5 w-5"}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
        </button>
      </div>
      <div
        className="flex-grow overflow-scroll gap-2 flex flex-col mx-2 pb-2 rounded-lg"
        ref={listRef}
        onWheel={() => {
          setScrolled(true);
        }}
      >
        {1 === undefined ? (
          <>
            <div className="animate-pulse rounded-md bg-black/10 h-5" />
            <div className="animate-pulse rounded-md bg-black/10 h-9" />
          </>
        ) : (
         'ẤDSAD'
        )}
      </div>
      <form
        className="border-t-neutral-200 dark:border-t-neutral-800 border-solid border-0 border-t-[1px] flex"
        onSubmit={(event) => void handleSend(event)}
      >
        <input
          className="w-full bg-white dark:bg-black border-none text-[1rem] pl-4 py-3 outline-none"
          autoFocus
          name="message"
          placeholder="Send a message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          disabled={input === ""}
          className="bg-transparent border-0 px-4 py-3 enabled:cursor-pointer enabled:hover:text-sky-500"
        >
          {/* <SendIcon className="w-5 h-5" /> */}
          <svg
      className={"w-5 h-5"}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
        </button>
      </form>
    </div>
  );
}

const STORE = (typeof window === "undefined" ? null : window)?.sessionStorage;
const STORE_KEY = "ConvexSessionId";

function useSessionId() {
  const [sessionId] = useState(
    () => STORE?.getItem(STORE_KEY) ?? crypto.randomUUID()
  );

  // Get or set the ID from our desired storage location, whenever it changes.
  useEffect(() => {
    STORE?.setItem(STORE_KEY, sessionId);
  }, [sessionId]);

  return sessionId;
}
