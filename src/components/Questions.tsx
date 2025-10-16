import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "./ui/table";
import { apiFetch } from "@/lib/apiClient.server";
import DeleteItem from "./DeleteItem";
import AnswerQuestion from "./AnswerQuestion";

type Props = {
  token: string;
};

const Questions = async ({ token }: Props) => {
  const questions = await apiFetch<questionType[]>("/question/vendor", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <div className="flex flex-col items-center max-w-[1360px] w-full">
      <div className="flex max-w-[1360px] w-full not-md:flex-wrap">
        <div className="max-w-[900px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions ? (
                questions.map((q, i) => (
                  <TableRow key={i}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell>{q.product.name}</TableCell>
                    <TableCell>{q.product.category.name}</TableCell>
                    <TableCell>
                      {q.user.fname}&nbsp;{q.user.lname}
                    </TableCell>
                    <TableCell>{new Date(q.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <AnswerQuestion
                        questionId={q.id}
                        token={token}
                        question={q.question}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteItem url={`/question/${q.id}`} token={token} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>No questions to answer</>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Questions;
