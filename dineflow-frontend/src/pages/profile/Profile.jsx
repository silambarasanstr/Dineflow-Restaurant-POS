import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, Calendar, CircleCheck } from "lucide-react";
import { getProfile } from "../../features/auth/authService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setProfile(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-1 text-xs text-gray-500">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Profile Header */}
        <div className="border-b border-gray-100 px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <User size={30} />
            </div>

            <div>
              <h2 className="text-base font-semibold capitalize text-gray-900">
                {profile.name}
              </h2>

              <p className="mt-1 text-xs text-gray-500">{profile.email}</p>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium capitalize text-gray-700">
                <ShieldCheck size={13} />
                {profile.role}
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="px-5 py-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Account Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <User size={15} />
                <span className="text-xs">Name</span>
              </div>

              <p className="text-sm font-medium capitalize text-gray-900">
                {profile.name}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Mail size={15} />
                <span className="text-xs">Email</span>
              </div>

              <p className="text-sm font-medium text-gray-900">
                {profile.email}
              </p>
            </div>

            {/* Role */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <ShieldCheck size={15} />
                <span className="text-xs">Role</span>
              </div>

              <p className="text-sm font-medium capitalize text-gray-900">
                {profile.role}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <CircleCheck size={15} />
                <span className="text-xs">Status</span>
              </div>

              <p className="text-sm font-medium text-gray-900">
                {profile.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            {/* Created At */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 sm:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Calendar size={15} />
                <span className="text-xs">Account Created</span>
              </div>

              <p className="text-sm font-medium text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
