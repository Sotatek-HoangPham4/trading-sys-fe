import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PreferencesSection = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Preferences</p>
      </div>
      <div className="space-y-4 mt-4 border-t-1 py-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Appearance</p>
            <p className="text-[13px] text-muted-foreground">
              Customize how Notion looks on your device.
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System setting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
