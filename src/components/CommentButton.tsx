import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function CommentButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Comment"}
    </Button>
  );
}

export default CommentButton;
