// "use client";
// import { changeVisibility } from "@/lib/actions/database";
// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { ChangeVisibilitySwitchProps } from "@/lib/types/types";

// export default function ChangeVisibilitySwitch({
//   userId,
//   watchListVisibility,
// }: ChangeVisibilitySwitchProps) {
//   const [visibility, setVisibility] = useState(watchListVisibility);
//   const handleChangeVisibility = async () => {
//     try {
//       setVisibility(!visibility);
//       await changeVisibility(userId);
//     } catch (error) {
//       console.error("Error changing visibility:", error);
//       setVisibility(!visibility);
//     }
//   };

//   return (
//     <>
//       <div className="mb-8 mt-4 flex items-center gap-2 text-xl">
//         <Label htmlFor="watchlist-visibility text-xl">
//           Watchlist visibility: {visibility ? "Public" : "Private"}
//         </Label>
//         <Switch
//           id="watchlist-visibility"
//           checked={visibility}
//           onCheckedChange={handleChangeVisibility}
//         />
//       </div>
//     </>
//   );
// }
