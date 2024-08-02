"use client";
import { changeVisibility } from "@/lib/actions/database";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChangeVisibilitySwitchProps } from "@/lib/types/types";

export default function ChangeVisibilitySwitch({
  userId,
  watchListVisibility,
}: ChangeVisibilitySwitchProps) {
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
      <div className="flex items-center gap-2 mt-4">
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
