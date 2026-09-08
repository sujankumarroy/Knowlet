"use client";

import { ChevronRight, Gift, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getReferredUsers, getUserReferralCode } from "@/actions/profile";
import type { PublicUser } from "@/types/user";

export default function ReferralCard() {
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const [showReferrals, setShowReferrals] = useState(false);
  const [referredUsers, setReferredUsers] = useState<PublicUser[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);

  useEffect(() => {
    const loadReferralCode = async () => {
      try {
        const code = await getUserReferralCode();
        setReferralCode(code);
      } catch (error) {
        console.error("Failed to load referral code:", error);
      }
    };

    void loadReferralCode();
  }, []);

  const handleRefer = async () => {
    if (!referralCode) return;

    const url = `${window.location.origin}/signup?ref=${encodeURIComponent(
      referralCode,
    )}`;

    const shareData = {
      title: "Join me on Knowlet",
      text: "Learn better with Knowlet. Join using my referral link!",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);

        // Replace with your toast
        console.log("Referral link copied");
      }
    } catch (error) {
      // User cancelled native share dialog
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Failed to share referral link:", error);
      }
    }
  };

  const handleViewReferrals = async () => {
    if (!referralCode) return;

    setShowReferrals(true);
    setLoadingReferrals(true);

    try {
      const users = await getReferredUsers(referralCode);
      setReferredUsers(users);
    } catch (error) {
      console.error("Failed to load referred users:", error);
    } finally {
      setLoadingReferrals(false);
    }
  };

  const handleCloseReferrals = () => {
    setShowReferrals(false);
  };

  return (
    <>
      <div className="w-full">
        {/* Refer & Earn */}
        <button
          type="button"
          onClick={handleRefer}
          disabled={!referralCode}
          className="group w-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
              <Gift size={24} strokeWidth={2} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-foreground">
                Refer & Earn
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Invite your friends to learn with Knowlet
              </p>

              {referralCode && (
                <p className="mt-2 text-xs text-gray-400">
                  Your code:{" "}
                  <span className="font-medium text-gray-600">
                    {referralCode}
                  </span>
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2 text-gray-400 transition group-hover:text-blue-600">
              <Share2 size={18} />
              <ChevronRight size={20} />
            </div>
          </div>
        </button>

        {/* View Referrals */}
        <button
          type="button"
          onClick={handleViewReferrals}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-muted hover:text-foreground"
        >
          View Referrals
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Referrals Popup */}
      {showReferrals && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={handleCloseReferrals}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="referrals-title"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2
                  id="referrals-title"
                  className="text-lg font-semibold text-foreground"
                >
                  Your Referrals
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                  People who joined Knowlet using your link
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseReferrals}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {loadingReferrals ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-primary" />
                </div>
              ) : referredUsers.length === 0 ? (
                <div className="py-12 text-center">
                  <Gift
                    size={32}
                    className="mx-auto text-primary"
                    strokeWidth={1.5}
                  />

                  <h3 className="mt-3 text-sm font-medium text-foreground">
                    No referrals yet
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Share your referral link to invite friends.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {referredUsers.map((referredUser) => (
                    <div
                      key={referredUser.id}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-muted"
                    >
                      {/* Avatar */}
                      {referredUser.picture ? (
                        <img
                          src={referredUser.picture}
                          alt={referredUser.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-primary">
                          {referredUser.name?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                      )}

                      {/* User info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {referredUser.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {referredUser.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
