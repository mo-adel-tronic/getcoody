"use client";

import { Button } from "@/components/ui/button";
import { QuestionEntity } from "@/types";
import { useState } from "react";

type Props = {
  question: QuestionEntity;
};

export default function QuestionsBody({ question }: Props) {
  const [answer, setAnswer] = useState(-1);
  const [feedback, setFeedback] = useState("");
  return (
    <div>
        <div className="space-y-2">
      {(JSON.parse(question.choices) as string[]).map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={`w-full text-xl justify-start ${
            answer == question.answer && answer == index && "bg-green-600 hover:bg-green-600 text-white hover:text-white"
          } ${
            answer >= 0 &&
            answer != question.answer &&
            answer == index &&
            "bg-red-500 hover:bg-red-500 text-white hover:text-white"
          } w-3/5`}
          onClick={() => {
            setAnswer(index);
            if(question.answer && question.answer == index) {
                setFeedback(question.feedback ?? "");
            } else {
                setFeedback("");
            }
          }}
        >
          {option}
        </Button>
      ))}
    </div>

    {
        feedback && <div className="mt-4 border-b-2 border-t-2 border-green-600 bg-background-light p-2 w-3/5">
        {feedback}
    </div>
    }
    </div>
  );
}
