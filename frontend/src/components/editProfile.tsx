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

export default function ProfilePage({ setProfileEdit }) {
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
      console.log("User data is here: ", userData);
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
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile data</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const fullName = `${userData.firstName} ${userData.lastName}`;
  const date = new Date(userData.updatedAt);

  return (
    <div className=" bg-gray-50 p-6 rounded-md w-[800px]">
      <div className="max-w-4xl ">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <Button onClick={() => setProfileEdit(false)} variant="outline">
              Close
            </Button>
          </div>

          <p className="text-gray-600 mt-2">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1 mb-12">
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="w-24 h-24 mx-auto">
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
                <p className="font-medium">
                  {date.toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{userData.department}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="lg:col-span-2 mb-12">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      {updateMutation.isPending ? "Saving.." : "Save"}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
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
                    <p className="p-2 bg-gray-50 rounded-md">
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
                    <p className="p-2 bg-gray-50 rounded-md">
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
                      onhChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md">
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
                    <p className="p-2 bg-gray-50 rounded-md">
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
                    <p className="p-2 bg-gray-50 rounded-md">
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
                    <p className="p-2 bg-gray-50 rounded-md">
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
                  <p className="p-2 bg-gray-50 rounded-md min-h-[100px]">
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
