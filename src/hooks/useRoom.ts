import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};
type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
    likes: Record<string,{
      authorId:string;
    }>
  }
>;
export function useRoom(roomId:string){
  const { user } = useAuth();
  const [questions, setquestions] = useState<Questions[]>([]);
  const [title, settitle] = useState("");
  
    useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key,value])=> value.authorId === user?.id)?.[0],
          };
        }
      );
      settitle(databaseRoom.title);
      setquestions(parsedQuestions);
    });
    return ()=>{
      roomRef.off('value');
    }
  }, [roomId,user?.id]);
  return {questions,title };
}