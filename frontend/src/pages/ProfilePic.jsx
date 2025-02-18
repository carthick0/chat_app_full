import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePic = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // 🔹 Compress Image Before Uploading
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // 🔹 Resize large images to 500x500 pixels max
          const maxSize = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // 🔹 Convert to compressed Base64 format (JPEG 70% quality)
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
      };
    });
  };

  // 🔹 Handle Image Upload & Compression
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate file type before uploading
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, etc.)");
      return;
    }

    try {
      const compressedImg = await compressImage(file);
      setSelectedImg(compressedImg); // Show preview

      // ✅ Update profile with compressed image
      await updateProfile({ profilePic: compressedImg });

      alert("Profile picture updated successfully! 🎉");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* 🔹 Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className=" size-8 h-5 bg-gray-300 rounded-xl"  />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
            
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border w-150">
                {authUser?.fullName || "User Name Not Available"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email || "Email Not Available"}
              </p>
            </div>
          </div>
        {/* 🔹 Account Information */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Account Information</h2>
          <div className="border-t mt-2 pt-3 space-y-3 text-sm w-150">
          <div className="flex items-center justify-between py-2 text-gray-500">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
