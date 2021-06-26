import { ReactNode } from "react";

import "../styles/question.scss";
type QuestionType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: QuestionType) {
  return (
    <div
      className={`question ${isAnswered ? "answered" : ""} ${
        isHighLighted && !isAnswered ? "highlighted" : ""
      }`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
