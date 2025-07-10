import logoIcon from "@/assets/icon.png";
import { Button } from "@/components/ui/button";
import { callBackgroundAction } from "@/lib/call-action";
import { InfoIcon, SettingsIcon } from "lucide-react";

export default function App() {
  return (
    <div className="min-w-[320px] p-4 gap-4 flex flex-col">
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="Logo" className="size-6" />
        <h1 className="m-0 text-xl font-bold mr-auto">Knowlink Web Clipper</h1>
      </div>
      <p className="text-sm">
        This is a Knowlink Web Clipper used to save web content to Knowlink.
      </p>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          onClick={() => {
            callBackgroundAction("openSettings");
          }}
        >
          <SettingsIcon /> Open Settings
        </Button>
        <a
          href="https://github.com/hlint/knowlink"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="sm">
            <InfoIcon /> Learn More
          </Button>
        </a>
      </div>
    </div>
  );
}
