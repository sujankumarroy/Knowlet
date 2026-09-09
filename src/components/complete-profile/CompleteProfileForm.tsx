"use client";

import { useAuth } from "@/context/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import AcademicInfoSection from "./AcademicInfoSection";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { User } from "@/types/user";

export default function CompleteProfileForm() {
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    picture: "",
    name: "",
    age: "",
    stream: "",
    standard: "",
    fav_subject: "",
  });

  useEffect(() => {
    setForm({
      picture: user?.picture || "/images/demo_pp.jpg",
      name: user?.name || "",
      age: String(user?.age) || "",
      stream: user?.stream || "",
      standard: user?.standard || "",
      fav_subject: user?.fav_subject || "",
    });
  }, [user]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/user/update", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const { data, error } = await res.json();
      setLoading(false);

      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }

      const user = data as User;
      setUser(user);
      console.log(user);

      toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Failed to Submit");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfilePhotoSection
        picture={form.picture}
        username={user.username}
        onChange={(picture) => updateField("picture", picture)}
      />

      <PersonalInfoSection
        name={form.name}
        age={form.age}
        onChange={updateField}
      />

      <AcademicInfoSection
        stream={form.stream}
        standard={form.standard}
        fav_subject={form.fav_subject}
        onChange={updateField}
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2Icon className="animate-spin" />
            Updating...
          </span>
        ) : (
          "Update Profile"
        )}
      </button>
    </form>
  );
}
