import "../styles/ChatGeneralChoice.css";
import SendIcon from '../../../assets/icon/chats/send.svg'

import { useEffect, useRef, useState } from "react";
import { useStore } from "effector-react";

import { $userSocketChatChoiceAllMessages, $userSocketChatChoiceId, $userSocketChatListAllChats } from "../../../ui/functions/createSocketChat";
import { sendMessages } from "../../../ui/functions/useSocketChat";
import { formatDateTime } from "../../../ui/functions/formatDateTime";

export interface IChatGeneralChoice {
    userValue: any
}
export const ChatGeneralChoice = (params: IChatGeneralChoice) => {
    const chat = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string | null>(null);
    const userSocketChatChoiceId = useStore($userSocketChatChoiceId);
    const userSocketChatChoiceAllMessages = useStore($userSocketChatChoiceAllMessages);
    const handleSendMessages = () => {
        if (message) {
            sendMessages(userSocketChatChoiceId, message)
            setMessage(null)
        }
    };

    useEffect(() => {
        setMessage(null)
    }, [userSocketChatChoiceId])

    useEffect(() => {
        if (chat !== null && chat.current !== null)
            chat.current.scrollTop = chat.current.scrollHeight;
    }, [userSocketChatChoiceId, userSocketChatChoiceAllMessages]);
    
    return (
        <div className="ChatGeneralChoice Half__Block Block__NonActive">
            <div className="ChatGeneralBar__Header Half__Block__Header">
                {Object.keys($userSocketChatListAllChats.getState())?.map(
                    (e: any) => e === userSocketChatChoiceId && $userSocketChatListAllChats.getState()[e].firstName + " " + $userSocketChatListAllChats.getState()[e].lastName
                )}
            </div>
            <div className="ChatGeneralChoice__Footer Half__Block__Footer">
                <div className="ChatGeneralChoice__ListBar">
                    <div ref={chat} className="ChatGeneralChoice__ListBar__Chat">
                        {userSocketChatChoiceAllMessages && userSocketChatChoiceAllMessages.map((e: any, id: number) =>
                            <div key={id} className={`${e.login === params.userValue.user.login && "ChatGeneralChoice__ListBar__Chat__Item-User"} ChatGeneralChoice__ListBar__Chat__Item`}>
                                <div className="ChatGeneralChoice__ListBar__Chat__Item__Content">
                                    {e.content}
                                </div>
                                <div className="ChatGeneralChoice__ListBar__Chat__Item__Time">
                                    {formatDateTime(e.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <form onSubmit={e => { e.preventDefault(); handleSendMessages() }} className="ChatGeneralChoice__InputBar">
                    <input required placeholder="Напишите ваше сообщение" className="ChatGeneralChoice__InputBar__Input" type="text" value={message || ""} onChange={(event: any) => setMessage(event.target.value)} />
                    <label htmlFor="save">
                        <img src={SendIcon} alt="SendIcon" className="ChatGeneralChoice__InputBar__Button" />
                    </label>
                    <input type="submit" id="save" style={{display: "none"}} value="Отправить" />
                </form>
            </div>
        </div>
    );
};
