import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React from "react";

const LanguageAndTimeSection = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Language & Time</p>
      </div>
      <div className="space-y-4 mt-4 border-y-1 py-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Language</p>
            <p className="text-[13px] text-muted-foreground">
              Change the language used in the user interface.
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">English(US)</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System setting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">
              Set timezone automatically using your location
            </p>
            <p className="text-[13px] text-muted-foreground">
              Reminders, notifications and emails are delivered based on your
              time zone.
            </p>
          </div>
          <Switch />
        </div>
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Timezone</p>
            <p className="text-[13px] text-muted-foreground">
              Current timezone setting.
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">English(US)</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System setting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTimeSection;
