"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { signOutAction } from "@/features/auth/actions";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/sign-in") {
    return null;
  }
  if (!session) {
    return null;
  }

  const isUploadActive = pathname === "/upload";
  const isChatActive = pathname === "/chat";

  return (
    <nav className="border-b border-gray-700 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="text-lg font-semibold text-white">My RAG</div>
            <div className="flex space-x-4">
              <Link
                href="/chat"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isChatActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Chat
              </Link>
              <Link
                href="/upload"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isUploadActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Upload
              </Link>
            </div>
          </div>
          <Button onClick={signOutAction} variant="outline" size="sm">
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
