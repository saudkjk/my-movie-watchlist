"use client";
import { changeVisibility } from "@/lib/database";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ChangeVisibilitySwitch({
  userId,
  watchListVisibility,
}: {
  userId: string;
  watchListVisibility: boolean;
}) {
  const [visibility, setVisibility] = useState(watchListVisibility);
  const handleChangeVisibility = async () => {
    try {
      setVisibility(!visibility);
      await changeVisibility(userId);
    } catch (error) {
      console.error("Error changing visibility:", error);
      setVisibility(!visibility);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Label htmlFor="watchlist-visibility">
          {visibility ? "Public" : "Private"}
        </Label>
        <Switch
          id="watchlist-visibility"
          checked={visibility}
          onCheckedChange={handleChangeVisibility}
        />
      </div>
    </>
  );
}
