"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/sign-in";
        },
      },
    });
  };

  // Don't show navbar on auth pages
  if (pathname.startsWith("/(auth)") || pathname === "/sign-in") {
    return null;
  }

  // Show loading state while session is being fetched
  if (isPending) {
    return (
      <nav className="border-b border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center">
            <div className="animate-pulse h-8 w-32 bg-gray-700 rounded" />
          </div>
        </div>
      </nav>
    );
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
          <Button onClick={handleSignOut} variant="outline" size="sm">
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
