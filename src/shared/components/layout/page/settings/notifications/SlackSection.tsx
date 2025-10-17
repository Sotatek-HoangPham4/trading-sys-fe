import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React from "react";

const SlackSection = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Slack notifications</p>
      </div>
      <div className="space-y-4 mt-4 border-t-1 py-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Slack notifications</p>
            <p className="text-[13px] text-muted-foreground">
              Receive notifications in your Slack workspace when you’re
              mentioned in a page, database property, or comment
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Off" />
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

export default SlackSection;
