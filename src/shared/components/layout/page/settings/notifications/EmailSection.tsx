import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React from "react";

const EmailSection = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Email notifications</p>
      </div>
      <div className="space-y-4 mt-4 border-t-1 py-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Activity in your workspace</p>
            <p className="text-[13px] text-muted-foreground">
              Receive emails when you get comments, mentions, page invites,
              reminders, access requests, and property changes
            </p>
          </div>
          <Switch />
        </div>
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Always send email notifications</p>
            <p className="text-[13px] text-muted-foreground">
              Receive emails about activity in your workspace, even when you’re
              active on the app
            </p>
          </div>
          <Switch />
        </div>
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Page updates</p>
            <p className="text-[13px] text-muted-foreground">
              Receive email digests for changes to pages you’re subscribed to
            </p>
          </div>
          <Switch />
        </div>
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Announcements and update emails</p>
            <p className="text-[13px] text-muted-foreground">
              Receive occasional emails about product launches and new features
              from Notion
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
