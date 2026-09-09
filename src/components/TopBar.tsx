"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  ChevronLeft,
  Bookmark,
  ThumbsUp,
  SkipBack,
  SkipForward,
  Edit,
  Download,
  Share2,
  Menu,
  SquarePen,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useHeader } from "@/context/HeaderContext";
import ProfileMenu from "./profile/ProfileMenu";
import { useReader } from "@/context/ReaderContext";
import { useDrawer } from "@/context/DrawerContext";
import { useChatActions } from "@/hooks/knowva/useChatActions";
import { ModelSelector } from "@/components/knowva/ModelSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BriefResourceInfo } from "@/types/resource";
import { upperCase } from "@/utils/string";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function IconButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-accent hover:text-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function TopBar() {
  const [downloading, setDownloading] = useState(false);

  const [prevRes, setPrevRes] = useState<BriefResourceInfo>();
  const [nextRes, setNextRes] = useState<BriefResourceInfo>();

  const { mode } = useHeader();
  const { user } = useAuth();
  const {
    like,
    bookmark,
    toggleLike,
    toggleBookmark,
    nearByResources,
    resourceId,
  } = useReader();
  const { setOpen: setOpenDrawer } = useDrawer();
  const { createNewChat } = useChatActions();

  const router = useRouter();
  const pathname = usePathname();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: pathname });
      } else {
        await navigator.clipboard.writeText(pathname);
        toast.info("Link copied to clipboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      toast.error("you are not signed in");
      return;
    }

    try {
      setDownloading(true);
      toast.info("Generating PDF");

      const response = await fetch(`/api/resources/pdf/${resourceId}`);

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const contentDisposition = response.headers.get("Content-Disposition");

      let filename = "resource.pdf";

      const match = contentDisposition?.match(/filename="([^"]+)"/);

      if (match?.[1]) {
        filename = match[1];
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const index = nearByResources.findIndex((r) => r.id === resourceId);

    if (index === -1) {
      setPrevRes(undefined);
      setNextRes(undefined);
      return;
    }

    setPrevRes(nearByResources[index - 1]);
    setNextRes(nearByResources[index + 1]);
  }, [nearByResources, resourceId]);

  return (
    <header className="fixed top-0 z-50 flex h-15 w-full items-center justify-center border-b border-border bg-card/90 px-4 backdrop-blur-md">
      {/* LEFT */}
      <div className="w-24 sm:w-32">
        {mode === "knowva" ? (
          <IconButton title="Menu" onClick={() => setOpenDrawer(true)}>
            <Menu className="w-5 h-5" />
          </IconButton>
        ) : (
          pathname !== "/" && (
            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-accent hover:text-primary active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )
        )}
      </div>

      {/* CENTER */}
      <div className="flex flex-1 items-center justify-center">
        {mode === "reader" && (
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card px-2 py-1 shadow-sm">
            <IconButton
              onClick={() => prevRes && router.push(prevRes.path)}
              title={(prevRes && upperCase(prevRes.target)) || "none"}
              disabled={!prevRes}
            >
              <SkipBack className="w-5 h-5" />
            </IconButton>

            <IconButton
              onClick={() => nextRes && router.push(nextRes.path)}
              title={(nextRes && upperCase(nextRes.target)) || "none"}
              disabled={!nextRes}
            >
              <SkipForward className="w-5 h-5" />
            </IconButton>

            {user?.role === "admin" && resourceId && (
              <IconButton
                onClick={() => {
                  router.push(`/dashboard/resources/update/${resourceId}`);
                }}
                title="update"
              >
                <Edit className="w-5 h-5" />
              </IconButton>
            )}

            <IconButton
              onClick={handleDownload}
              title={downloading ? "Downloading..." : "Download PDF"}
              disabled={downloading}
            >
              <Download className="w-5 h-5" />
            </IconButton>

            <IconButton onClick={handleShare} title={"Share"}>
              <Share2 className={`w-5 h-5 transition`} />
            </IconButton>

            <IconButton
              onClick={toggleLike}
              title={
                like === "active"
                  ? "Unlike"
                  : like === "inactive"
                    ? "Like"
                    : "Updating..."
              }
            >
              <ThumbsUp
                className={`w-5 h-5 transition ${
                  like === "active"
                    ? "text-indigo-600 fill-indigo-100"
                    : "text-slate-500"
                }`}
              />
            </IconButton>

            <IconButton
              onClick={toggleBookmark}
              title={
                bookmark === "active"
                  ? "Remove Bookmark"
                  : bookmark === "inactive"
                    ? "Bookmark"
                    : "Updating..."
              }
              disabled={bookmark === "loading"}
            >
              <Bookmark
                className={`w-5 h-5 transition ${
                  bookmark === "active"
                    ? "text-indigo-600 fill-indigo-100"
                    : "text-slate-500"
                }`}
              />
            </IconButton>
          </div>
        )}

        {mode === "knowva" && (
          <div className="flex w-full items-center">
            <div className="flex flex-1 justify-start">
              <ModelSelector />
            </div>

            <div className="flex flex-1 justify-center">
              <button
                onClick={() => router.push("/")}
                className="text-lg font-semibold tracking-[-0.04em] text-foreground"
              >
                Knowlet
              </button>
            </div>

            <div className="flex flex-1 justify-end">
              <button
                onClick={() => createNewChat()}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium"
              >
                <SquarePen className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {mode === "home" && (
          <button
            onClick={() => router.push("/")}
            className="text-lg font-semibold tracking-[-0.04em] text-foreground"
          >
            Knowlet
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex w-24 justify-end gap-2 sm:w-32">
        <ThemeToggle />
        {user ? (
          <ProfileMenu />
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="text-sm font-semibold text-primary transition hover:text-indigo-700 active:scale-95 sm:block"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
