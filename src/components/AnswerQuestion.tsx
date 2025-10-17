"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/lib/apiClient.client";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";

type Props = {
  questionId: number;
  question: string;
  token: string;
};

const AnswerQuestion = ({ questionId, question, token }: Props) => {
  const [isPending, startTransitionn] = useTransition();
  const router = useRouter();
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleClick = () => {
    startTransitionn(async () => {
      const data = {
        questionId: questionId,
        answer: answer,
      };

      console.log(JSON.stringify(data));

      const res = await apiFetchClient("/question/answer", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res) {
        toast("Updated!");
        router.refresh();
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Answer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>{question}</DialogDescription>
        </DialogHeader>
        <textarea
          id="body"
          name="body"
          className="bg-white max-w-200 w-full h-30 outline rounded-2xl p-2"
          onChange={handleChange}
        />
        <Button disabled={isPending} onClick={handleClick}>
          {isPending ? <Spinner /> : "Answer"}
        </Button>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AnswerQuestion;
