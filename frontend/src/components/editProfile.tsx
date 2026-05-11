import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Save, X } from "lucide-react";
import api from "@/utility/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDateDDMMYY } from "@/lib/utils";

function decodeToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

async function fetchUserData(userId: string) {
  const response = await api.get(`/user/${userId}`, {});
  return response.data.user;
}

async function updateUserProfile(profileData: any) {
  console.log("editted:", profileData);
  const response = await api.post("/user/update-profile", profileData);
  return response.data;
}

export default function ProfilePage({ setProfileEdit }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const getUserId = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const decoded = decodeToken(token);
    return decoded.id;
  };

  const userId = getUserId();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId!),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: (profileData: any) => updateUserProfile(profileData),
    onSuccess: () => {
      toast("✅ Profile update success");
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast("❌ Profile not updated");
      console.error("Update failed:", error);
    },
  });
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    bio: "",
  });

  useState(() => {
    if (userData) {
      setEditedProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.userDetail?.phoneNumber,
        address: userData.userDetail?.address,
        gender: userData.gender || "",
        bio: userData.userDetail?.bio || "No bio.",
      });
    }
  });

  const handleSave = () => {
    const profileData = {
      email: editedProfile.email,
      firstName: editedProfile.firstName,
      lastName: editedProfile.lastName,
      phoneNumber: editedProfile.phoneNumber,
      address: editedProfile.address,
      gender: editedProfile.gender,
      bio: editedProfile.bio,
    };

    updateMutation.mutate(profileData);
  };

  const handleCancel = () => {
    if (userData) {
      setEditedProfile({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.userDetail?.phoneNumber || "",
        address: userData.userDetail?.address || "",
        gender: userData.gender || "",
        bio: userData.userDetail?.bio || "No bio.",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[12rem] w-full max-w-4xl items-center justify-center rounded-md bg-gray-50 p-6">
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex min-h-[12rem] w-full max-w-4xl items-center justify-center rounded-md bg-gray-50 p-6">
        <div className="text-center">
          <p className="mb-4 text-sm text-red-600 sm:text-base">Failed to load profile data</p>
          <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const fullName = `${userData.firstName} ${userData.lastName}`;
  const date = new Date(userData.updatedAt);

  return (
    <div className="my-2 w-full max-w-4xl rounded-md bg-gray-50 p-4 sm:my-4 sm:p-6">
      <div className="w-full min-w-0">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Profile Settings
            </h1>
            <Button
              onClick={() => setProfileEdit(false)}
              variant="outline"
              className="w-full shrink-0 sm:w-auto"
            >
              Close
            </Button>
          </div>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="mx-auto h-20 w-20 sm:h-24 sm:w-24">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback className="text-2xl bg-blue-500 text-white">
                    {fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="mt-4">{fullName}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Badge variant="secondary">{userData.role}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Member since</p>
                <p className="font-medium">{formatDateDDMMYY(date)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{userData.department}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                <CardDescription className="text-sm">
                  Update your personal details and contact information
                </CardDescription>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full cursor-pointer sm:w-auto"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 sm:w-auto"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {updateMutation.isPending ? "Saving.." : "Save"}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="w-full cursor-pointer sm:w-auto"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.firstName}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          firstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.lastName}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          lastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.lastName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phoneNumber"
                      value={editedProfile.phoneNumber}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.userDetail?.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editedProfile.address}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.userDetail?.address}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Gender</Label>
                  {isEditing ? (
                    <Select
                      value={editedProfile.gender}
                      onValueChange={(value) =>
                        setEditedProfile({
                          ...editedProfile,
                          gender: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                      {userData.gender}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    rows={4}
                    value={editedProfile.bio}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        bio: e.target.value,
                      })
                    }
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="min-h-[100px] break-words rounded-md bg-gray-50 p-2 text-sm sm:text-base">
                    {userData.userDetail?.bio}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
