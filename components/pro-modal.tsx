"use client";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { auth, redirectToSignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubscribe = async () => {
    // check if user is signed in
    if (!isSignedIn) {
      proModal.onClose()
      router.push(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <div>
              Create <span className="text-sky-500 font-medium">Custom AI</span>{" "}
              Companions!
            </div>
            <div className="text-sm pt-6">
              (Use PayPal; You won&apos;t be actually charged)
            </div>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9<span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
