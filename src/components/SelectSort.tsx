"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MobileSelectSort } from "./MobileSelectSort";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export function SelectSort() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-[120px]">
          <div className={"flex w-full items-center justify-between"}>
            Sort By
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 p-2">
        <MobileSelectSort />
      </PopoverContent>
    </Popover>
  );
}
