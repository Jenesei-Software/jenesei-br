import "../styles/ChatGeneralBarItem.css";

import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";

import DefaultAvatarChat from '../../../assets/icon/chats/default-avatar.svg'
import { ApiImage } from "../../../ui/functions/axiosInstance";
import { $userSocketChatChoiceId } from "../../../ui/functions/createSocketChat";

export interface IChatGeneralBarItem {
    value: any
    chatId: any
}
export const ChatGeneralBarItem = (params: IChatGeneralBarItem) => {
    const navigate = useNavigate();
    const userSocketChatChoiceId = useStore($userSocketChatChoiceId);
    return (
        <div className={`${userSocketChatChoiceId === params.chatId && "ChatGeneralBarItem-Choice"} ChatGeneralBarItem`} onClick={() => navigate(`/chat/${params.value.interlocutor_id}`)}>
            <img src={params.value.avatarPath ? ApiImage + params.value.avatarPath : DefaultAvatarChat} className="ChatGeneralBarItem__Avatar" alt="" />
            <div className="ChatGeneralBarItem__Info">
                <div className="ChatGeneralBarItem__Info__Name">
                    {params.value.firstName + " " + params.value.lastName}
                </div>
                {params.value.content && <div className="ChatGeneralBarItem__Info__Preview">
                    {params.value.content.message}
                </div>}
            </div>
            {/* <div className="ChatGeneralBarItem__Message HeaderBarChat__List__Message">
                2
            </div> */}
        </div>
    );
};
